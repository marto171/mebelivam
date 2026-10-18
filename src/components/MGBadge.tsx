/**
 * Дискретен знак „Изработка · MG Enterprise“ за футъра на клиентски сайт.
 *
 * Стиловете са вградени нарочно. Файлът влиза в петдесетина различни
 * проекта и не всички имат еднаква настройка на Tailwind, затова знакът не
 * разчита на нито един клас от сайта домакин.
 *
 * ⚠️ Цветът НЕ се наследява. Първият опит ползваше `currentColor` и на
 * тъмния футър на ЗАРА СТИИЛ текстът излезе почти нечетим, защото наследи
 * избледнелия цвят на копирайта. Затова знакът носи свои цветове и приема
 * `tone`: „dark“ за тъмен футър, „light“ за светъл.
 *
 * `slug` отива в адреса като `utm_content`. Заявката, която влиза в базата
 * на MG, носи името на проекта, затова веднага се вижда от кой готов сайт
 * е дошъл човекът.
 */

const БАЗА = "https://www.mgenterprise.bg/website";

const ТОНОВЕ = {
  dark: {
    ramka: "rgba(255,255,255,0.18)",
    fon: "rgba(255,255,255,0.04)",
    nadpis: "rgba(255,255,255,0.55)",
    ime: "rgba(255,255,255,0.92)",
  },
  light: {
    ramka: "rgba(0,0,0,0.14)",
    fon: "rgba(0,0,0,0.03)",
    nadpis: "rgba(0,0,0,0.52)",
    ime: "rgba(0,0,0,0.84)",
  },
} as const;

export default function MGBadge({
  slug,
  tone = "dark",
}: {
  slug: string;
  tone?: "dark" | "light";
}) {
  const t = ТОНОВЕ[tone];
  const адрес =
    `${БАЗА}?utm_source=klient&utm_medium=sait` +
    `&utm_campaign=portfolio&utm_content=${encodeURIComponent(slug)}`;

  return (
    <a
      href={адрес}
      target="_blank"
      rel="noopener"
      aria-label="Изработка от MG Enterprise, уебсайтове за бизнес"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 16px 7px 8px",
        borderRadius: 999,
        border: `1px solid ${t.ramka}`,
        background: t.fon,
        textDecoration: "none",
        lineHeight: 1,
        verticalAlign: "middle",
        maxWidth: "100%",
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          flex: "0 0 auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg,#F6C76A 0%,#E8A33D 55%,#C9742B 100%)",
          color: "#3A2A12",
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: "-0.02em",
        }}
      >
        MG
      </span>

      <span style={{ display: "inline-flex", flexDirection: "column", gap: 3 }}>
        <span
          style={{
            fontSize: 9,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: t.nadpis,
          }}
        >
          Изработка
        </span>
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.01em",
            color: t.ime,
          }}
        >
          MG Enterprise
        </span>
      </span>
    </a>
  );
}
