const SmartMenuLogo = ({ className }: { className?: string }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className="mb-4">
        <img 
          src="/lovable-uploads/c91e2a0b-6548-448e-9b13-7a9dee9aa5c2.png" 
          alt="SmartMenu Logo" 
          className="w-24 h-24 object-contain drop-shadow-lg"
        />
      </div>
      <h1 className="text-3xl font-bold text-white tracking-wider drop-shadow-lg">
        SMARTMENU
      </h1>
    </div>
  );
};

export default SmartMenuLogo;