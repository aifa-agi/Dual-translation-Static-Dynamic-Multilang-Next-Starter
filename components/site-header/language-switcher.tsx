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

  // Фильтрация языков по введенному тексту
  const languages = useMemo(() => {
    return getAvailableLanguages().filter(
      (lang) =>
        lang.nativeName.toLowerCase().startsWith(filter.toLowerCase()) ||
        lang.englishName.toLowerCase().startsWith(filter.toLowerCase())
    );
  }, [filter]);

  // Обработка выбора языка
  const handleChange = (langCode: string) => {
    // Удалить текущий языковой префикс из пути
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
          variant={variant === "desktop" ? "outline" : "ghost"}
          size="sm"
          className={
            variant === "desktop"
              ? "gap-2"
              : "h-8 text-white/70 shadow-none hover:bg-white/10 hover:text-white"
          }
          aria-label="Select language"
        >
          <Languages className="h-4 w-4" />
          {variant === "desktop" && <span>Language</span>}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 max-h-64 overflow-auto p-2">
        
        <input
          type="text"
          value={filter}
          autoFocus
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Search language..."
          className="input-bordered input mb-2 w-full"
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
