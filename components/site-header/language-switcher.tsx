"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { getAvailableLanguages } from "@/config/translations/translations.config";
import { Input } from "../ui/input";

interface LanguageSwitcherProps {
  currentLang: string;
  variant: "desktop" | "mobile";
}

const MAX_VISIBLE_ITEMS = 10;

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  variant,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState("");


  const languages = useMemo(() => {
    return getAvailableLanguages().filter(
      (lang) =>
        lang.nativeName.toLowerCase().startsWith(filter.toLowerCase()) ||
        lang.englishName.toLowerCase().startsWith(filter.toLowerCase())
    );
  }, [filter]);

 
  const handleChange = (langCode: string) => {
    const pathSegments = pathname.split("/").filter(Boolean);
    if (pathSegments.length > 0 && pathSegments[0] === currentLang) {
      pathSegments.shift();
    }

    const newPath = `/${langCode}/${pathSegments.join("/")}`;
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={
            variant === "desktop"
              ? "gap-2 h-9"
              : "h-9 mr-2 rounded-full"
          }
          aria-label="Select language"
        >
          <Languages className="h-4 w-4" />
          {variant === "desktop" && <span>Language</span>}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 max-h-64 overflow-auto p-2">
        
        <Input
          type="text"
          value={filter}
          autoFocus
          onChange={(e) => setFilter(e.target.value)}
          placeholder=" Search language..."
        />
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup value={currentLang} onValueChange={handleChange}>
          {languages.map((lang, index) => (
            <DropdownMenuRadioItem key={lang.code} value={lang.code}>
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.nativeName}</span>
              </span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
