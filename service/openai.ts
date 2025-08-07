import { useUserMetrics } from "~/composables/useUserMetrics";
import { useClientMetrics } from "~/composables/useClientMetrics";
import { createSupabaseClient } from "~/lib/supabase";
import { getCurrentLocalTime, createLocalTimestamp } from "~/lib/utils";
import { LENIN_CONTEXT } from "./lenin-context";

interface OpenAIResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
  usage?: {
    total_tokens: number;
  };
  model: string;
}

const useChatCompletion = async (question: string) => {
  const { setMetricsHeaders } = useUserMetrics();
  const { getClientMetrics } = useClientMetrics();
  const headers = setMetricsHeaders();
  const config = useRuntimeConfig();
  const startTime = Date.now();

  try {
    console.log('Making direct call to OpenAI API...');

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${config.public.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
        'User-Agent': 'LeninGPT/1.0',
        'x-user-timezone': headers.get('x-user-timezone') || '',
        'x-user-language': headers.get('x-user-language') || '',
      },
      body: JSON.stringify({
        model: "gpt-4o",
        temperature: 0.5,
        max_tokens: 150,
        user: "Lenin",
        messages: [
          {
            role: "user",
            content: `${LENIN_CONTEXT}

Pergunta: ${question}
Resposta:`
          }
        ]
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
    }

    const data: OpenAIResponse = await response.json();
    const responseTime = Date.now() - startTime;
    const tokensUsed = data.usage?.total_tokens || 0;

    console.log('OpenAI response received:', data);

    // Record the interaction in the database using client-side Supabase
    try {
      console.log('Attempting to save question to database...');

      const supabase = createSupabaseClient();
      const userMetrics = await getClientMetrics();

      // Get current timestamp in user's timezone
      const userTimezone = userMetrics.user_timezone || 'UTC';
      const localTime = getCurrentLocalTime(userTimezone);
      const localTimestamp = createLocalTimestamp(userTimezone);

      console.log('Saving with user timezone:', userTimezone);
      console.log('Current local time:', localTime);
      console.log('Local timestamp for database:', localTimestamp);

      const { data: dbData, error } = await supabase
        .from('lenin_questions')
        .insert({
          user_question: question,
          model_used: data.model,
          tokens_used: tokensUsed,
          response_time_ms: responseTime,
          user_ip: userMetrics.user_ip,
          user_city: userMetrics.user_city,
          user_country: userMetrics.user_country,
          user_region: userMetrics.user_region,
          user_browser: userMetrics.user_browser,
          user_os: userMetrics.user_os,
          user_device: userMetrics.user_device,
          user_language: userMetrics.user_language,
          user_timezone: userMetrics.user_timezone,
          created_at: localTimestamp, // Save with local timezone
        })
        .select()
        .single();

      if (error) {
        console.error('Error recording to database:', error);
        console.error('Error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        // Don't throw error here, just log it so the API still works
      } else {
        console.log('Successfully recorded question to database:', dbData);
        console.log('Recorded at local time:', localTime);
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      console.error('Error type:', typeof dbError);
      console.error('Error stack:', dbError instanceof Error ? dbError.stack : 'No stack');
      // Don't throw error here, just log it so the API still works
    }

    // Return in the expected format for the application
    return {
      message: {
        content: data.choices[0].message.content,
        role: data.choices[0].message.role
      }
    };
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    throw new Error('Falha ao processar sua pergunta. Tente novamente.');
  }
};

export { useChatCompletion };
