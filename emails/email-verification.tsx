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

  const colors = {
    primary: "#cb6441",
    background: "#ffffff",
    text: "#333333",
    mutedText: "#666666",
  };

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
              Verify your <strong>Startacus</strong> account
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Hey {username}!
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Thank you for signing up for <strong>Startacus</strong>. To
              complete your registration, please verify your email address. This
              assists us in keeping your account safe.
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
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
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className={`text-[${colors.mutedText}] text-center text-xs`}>
              If you didn&apos;t sign up for Startacus using &quot;{userEmail}
              &quot;, please ignore this email.
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
