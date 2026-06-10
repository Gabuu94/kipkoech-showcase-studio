import whatsappLogo from "../assets/logos/whatsapp-logo.png";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254797585941"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <img
        src={whatsappLogo}
        alt="WhatsApp"
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />
    </a>
  );
}
