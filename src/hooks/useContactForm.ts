import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export type ContactFormData = z.infer<typeof formSchema>;

export const useContactForm = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (values: ContactFormData) => {
    try {
      console.log('[ContactForm] Starting form submission with values:', values);
      
      const { data, error } = await supabase.functions.invoke('sendemail', {
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          type: 'contact'
        }),
      });

      console.log('[ContactForm] Supabase response:', { data, error });

      if (error) {
        console.error('[ContactForm] Supabase error:', error);
        throw error;
      }

      toast({
        title: "Success!",
        description: "Thank you for your interest. We'll be in touch soon.",
        duration: 5000,
      });
      
      form.reset();
      console.log('[ContactForm] Form submitted successfully');
    } catch (error) {
      console.error('[ContactForm] Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: form.formState.isSubmitting,
  };
};