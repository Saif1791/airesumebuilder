export default function SocialLink({
  socialLink,
}: {
  socialLink: string | undefined;
}) {
  return (
    <a href={`${socialLink}`} target="_blank">
      {socialLink}
    </a>
  );
}
