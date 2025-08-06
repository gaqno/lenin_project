import { inject, track } from "@vercel/analytics";

export default defineNuxtPlugin(() => {
  // Inject analytics
  inject();

  // Return track function for global use
  return {
    provide: {
      trackQuestion: (question: string) => {
        // Track with Vercel Analytics only
        track('question_asked', {
          question: question.substring(0, 100), // Limit length for privacy
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        });
      }
    }
  };
});
