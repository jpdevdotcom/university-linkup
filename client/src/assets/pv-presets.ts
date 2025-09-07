import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'

export const MainPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#E8F1FE',
      100: '#C9DDFD',
      200: '#A2C8FB',
      300: '#7BB3F9',
      400: '#539DF6',
      500: '#1877F2', // base
      600: '#1462CC',
      700: '#104DA6',
      800: '#0C387F',
      900: '#082359',
      950: '#04112E',
    },
  },
  components: {
    button: {
      css: ({ dt }) => `
        .p-button.p-button {
          background-color: ${dt('primary.500')};
        }
        .p-button-label {
          color: #FFFFFF !important;
        }
        .p-button.p-button:hover {
          background-color: ${dt('primary.400')};
        }
      `,
    },
    select: {
      root: {
        background: '#FFFFFF',
        color: '#000000',
      },
      css: () => `
        .p-select-option-label {
          color: #ffffff !important;
        }
        .p-select-filter {
          background-color: #09090B;
        }
      `,
    },
    inputtext: {
      root: {
        background: '#ffffff',
        color: '#111111',
      },
    },
  },
})
