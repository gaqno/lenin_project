interface ConversationMessage {
  id: string;
  author: {
    role: string;
  };
  content: {
    content_type: string;
    parts: string[];
  };
  metadata: Record<string, unknown>;
}

interface Conversation {
  action: string;
  messages: ConversationMessage[];
  parent_message_id: string;
  model: string;
  timezone_offset_min: number;
  history_and_training_disabled: boolean;
  arkose_token: unknown | null;
}
