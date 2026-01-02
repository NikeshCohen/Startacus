import { colors } from "@/emails/resend";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface FeedbackEmailProps {
  name: string;
  email: string;
  feedbackType: string;
  message: string;
}

export const FeedbackEmail = ({
  name,
  email,
  feedbackType,
  message,
}: FeedbackEmailProps) => {
  const previewText = `New feedback from ${name} - ${feedbackType}`;

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body
          className={`mx-auto my-auto bg-[${colors.background}] px-2 font-sans`}
        >
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] max-w-[465px] rounded-md border border-solid border-[#eaeaea] p-[20px]">
            <Section>
              <div
                style={{
                  borderTopWidth: "4px",
                  borderTopStyle: "solid",
                  borderTopColor: colors.primary,
                  marginBottom: "20px",
                }}
              />
              <Img
                src="https://startacus.vercel.app/icon(black).png"
                width="40"
                height="40"
                alt="Startacus Logo"
                className="mx-auto mt-[20px]"
              />
            </Section>
            <Heading className="mx-0 my-[10px] p-0 text-center text-[24px] font-normal text-black">
              New Feedback Received
            </Heading>
            <Text className="text-[14px] leading-[24px] font-semibold text-black">
              From: {name}
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Email: {email}
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Type: <strong>{feedbackType}</strong>
            </Text>
            <Hr className="mx-0 my-[20px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[14px] leading-[24px] font-semibold text-black">
              Message:
            </Text>
            <Text className="text-[14px] leading-[24px] whitespace-pre-wrap text-black">
              {message}
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className={`text-[${colors.mutedText}] text-center text-xs`}>
              This feedback was submitted via the Startacus feedback form.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

FeedbackEmail.PreviewProps = {
  name: "John Doe",
  email: "john@example.com",
  feedbackType: "Bug Report",
  message: "I encountered an issue with the login form...",
} as FeedbackEmailProps;

export default FeedbackEmail;
