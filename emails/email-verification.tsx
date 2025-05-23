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

interface EmailVerificationProps {
  userEmail: string;
  username: string;
  verificationLink: string;
}

export const EmailVerification = ({
  userEmail,
  username,
  verificationLink,
}: EmailVerificationProps) => {
  const previewText = "Startacus - Verify your email address";

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body
          className={`mx-auto my-auto bg-[${colors.background}] px-2 font-sans`}
        >
          <Preview>{previewText}</Preview>
          <Container className="mx-auto my-[40px] p-[20px] border border-[#eaeaea] border-solid rounded-md max-w-[465px]">
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
            <Heading className="mx-0 my-[10px] p-0 font-normal text-[24px] text-black text-center">
              Verify your <strong>Startacus</strong> account
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">
              Hey {username}!
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Thank you for signing up for <strong>Startacus</strong>. To
              complete your registration, please verify your email address. This
              assists us in keeping your account safe.
            </Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Please click the button below to verify your email address.
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
                href={verificationLink}
              >
                Verify Email Address
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] border border-[#eaeaea] border-solid w-full" />
            <Text className={`text-[${colors.mutedText}] text-center text-xs`}>
              If you didn&apos;t sign up for Startacus using{" "}
              <strong>{userEmail}</strong>, please ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmailVerification.PreviewProps = {
  userEmail: "test@test.com",
  username: "test",
  verificationLink: "https://startacus.com",
} as EmailVerificationProps;

export default EmailVerification;
