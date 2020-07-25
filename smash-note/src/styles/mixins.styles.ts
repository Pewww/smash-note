export const horizontalCenterMixin = () => `
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const verticalCenterMixin = () => `
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

export const centerMixin = () => `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
