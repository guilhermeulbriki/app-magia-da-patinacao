module.exports = {
  root: true,
  extends: [
    'universe/native',
    'universe/shared/typescript-analysis'
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*',
        '*.ts',
        '*.tsx',
        '*.d.ts'
      ],
    },
  ],
  globals: {
    jasmine: false,
  },
  settings: {
    react: {
      version: '16',
    },
  },
  parserOptions: {
    project: './tsconfig.json'
  },
};
