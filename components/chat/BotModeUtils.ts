export const Personalities = [
  {
    name: "Select Mode",
    value: "",
  },

  {
    name: "Real VOID 😁",
    value: "void",
  },
  {
    name: "VOID(indian mode)",
    value: "indian",
  },

  {
    name: "VOID(roast mode)",
    value: "roast",
  },
  ,
  // {
  //     name: "VOID(lazy mode)",
  //     value: "lazy"
  // }
  {
    name: "VOID(dumb mode)",
    value: "dumb",
  },
];

export const providers = {
  openrouter: "openrouter",
  pollinations: "pollinations",
};

export const botModels = [
  {
    name: "VOID(Best)😁",
    value: "openai",
    active: true,
    provider: providers.pollinations,
  },
  {
    name: "VOID(Uncensored)😶‍🌫️",
    value: "venice/uncensored:free",
    active: false,
    provider: providers.openrouter,
  },
  {
    name: "VOID (Reasoning Pro) 🧠",
    value: "deepseek-reasoning",
    active: true,
    provider: providers.pollinations,
  },
  {
    name: "VOID (Code Genius) 🔧",
    value: "qwen-coder",
    active: false,
    provider: providers.pollinations,
  },
  {
    name: "VOID (Fast & Light) ⚡",
    value: "openai-fast",
    active: true,
    provider: providers.pollinations,
  },
  {
    name: "VOID 🧠",
    value: "moonshotai/kimi-vl-a3b-thinking:free",
    active: false,
    provider: providers.openrouter,
  },
];

export const VoidModelKey = "model";
