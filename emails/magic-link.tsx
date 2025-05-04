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

interface MagicLinkEmailProps {
  userEmail: string;
  magicLinkUrl: string;
}

export const MagicLinkEmail = ({
  userEmail,
  magicLinkUrl,
}: MagicLinkEmailProps) => {
  const previewText = "Startacus - Sign in with magic link";

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
              Sign in to <strong>Startacus</strong>
            </Heading>
            <Text className="text-[14px] text-black leading-[24px]">Hey,</Text>
            <Text className="text-[14px] text-black leading-[24px]">
              Someone (hopefully you) has requested a magic link to sign in to
              your <strong>Startacus</strong> account. Click the button below to
              securely sign in.
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
              Requested using: {userEmail}
            </Text>

            <Text className="text-[14px] text-black leading-[24px]">
              This link will expire in 5 minutes and can only be used once.
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
                href={magicLinkUrl}
              >
                Sign In
              </Button>
            </Section>
            <Hr className="mx-0 my-[26px] border border-[#eaeaea] border-solid w-full" />
            <Text className={`text-[${colors.mutedText}] text-center text-xs`}>
              If you didn&apos;t request this magic link for{" "}
              <strong>{userEmail}</strong>, please ignore this email. Your
              account remains secure.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

MagicLinkEmail.PreviewProps = {
  userEmail: "test@test.com",
  magicLinkUrl: "https://startacus.com",
} as MagicLinkEmailProps;

export default MagicLinkEmail;
