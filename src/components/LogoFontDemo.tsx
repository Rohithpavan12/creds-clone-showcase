import { Link } from "react-router-dom";

const LogoFontDemo = () => {
  const logoFonts = [
    { name: 'Coiny (Current)', class: 'font-logo', description: 'Distinctive, playful, and memorable' },
    { name: 'Poppins', class: 'font-logo-poppins', description: 'Modern, clean, and professional' },
    { name: 'Montserrat', class: 'font-logo-alt', description: 'Bold and geometric, great for tech brands' },
    { name: 'Outfit', class: 'font-logo-modern', description: 'Contemporary and sleek' },
    { name: 'Raleway', class: 'font-logo-elegant', description: 'Elegant and sophisticated' },
    { name: 'Inter', class: 'font-logo-tech', description: 'Tech-focused and highly readable' },
  ];

  return (
    <div className="p-8 bg-background">
      <h2 className="text-2xl font-bold mb-8 text-text-primary">Logo Font Options for Fundineed</h2>
      <div className="space-y-6">
        {logoFonts.map((font, index) => (
          <div key={index} className="border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-text-primary">{font.name}</h3>
              <span className="text-sm text-text-secondary">{font.description}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className={`text-3xl ${font.class === 'font-logo' ? 'font-normal' : 'font-black'} text-transparent bg-gradient-primary bg-clip-text tracking-wide ${font.class}`}>
                Fundineed
              </span>
              <span className={`text-xl ${font.class === 'font-logo' ? 'font-normal' : 'font-bold'} text-text-primary ${font.class}`}>
                Education Loans
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <p className="text-sm text-text-secondary">
          <strong>Current:</strong> Using Coiny font (font-logo). To change, update the className in Navbar.tsx, Index.tsx, and Admin.tsx from 'font-logo' to any of the other options above.
        </p>
      </div>
    </div>
  );
};

export default LogoFontDemo;
