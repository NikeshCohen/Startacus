import { colors } from "@/emails/resend";
import {
  Body,
  Button,
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

interface EmailChangeConfirmationProps {
  userEmail: string;
  newEmail: string;
  username: string;
  confirmationLink: string;
}

export const EmailChangeConfirmation = ({
  userEmail,
  newEmail,
  username,
  confirmationLink,
}: EmailChangeConfirmationProps) => {
  const previewText = "Startacus - Confirm your email address change";

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
              Confirm your email change
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hey {username}!
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We received a request to change your email address for your{" "}
              Startacus account from <strong>{userEmail}</strong> to{" "}
              <strong>{newEmail}</strong>.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              For security reasons, we need to verify this request. Please click
              the button below to confirm this change.
            </Text>
            <Section className="mt-[32px] mb-[32px] text-center">
              <Button
                style={{
                  backgroundColor: colors.primary,
                  color: "#ffffff",
                  borderRadius: "4px",
                  fontSize: "14px",
                  fontWeight: "600",
                  padding: "12px 20px",
                  textDecoration: "none",
                }}
                href={confirmationLink}
              >
                Confirm Email Change
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className={`text-[${colors.mutedText}] text-center text-xs`}>
              If you didn&apos;t request this email change for your{" "}
              <strong>Startacus</strong> account, please ignore this email or
              contact support immediately for assistance.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailChangeConfirmation.PreviewProps = {
  userEmail: "current@example.com",
  newEmail: "new@example.com",
  username: "User",
  confirmationLink: "https://startacus.com",
} as EmailChangeConfirmationProps;

export default EmailChangeConfirmation;
