import { useToast as useToastBase } from "~/components/ui/toast";

export const useToast = () => {
  const { toast } = useToastBase();

  const showSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    });
  };

  const showError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
    });
  };

  const showInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    });
  };

  const showWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "default",
    });
  };

  return {
    toast,
    showSuccess,
    showError,
    showInfo,
    showWarning,
  };
};
