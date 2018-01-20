export const container = {
  position: 'absolute',
  top: 'calc(50% - 20px)',
  width: 'auto',
  left: '50%',
  transform: 'translateX(-50%)',
};

export const progress = {
  verticalAlign: 'middle',
  display: 'inline-block',
  width: 40,
  height: 40
};

export const message = (palette) => ({
  marginLeft: 20,
  verticalAlign: 'middle',
  display: 'inline-block',
  lineHeight: '40px',
  textShadow: '0 2px 4px rgba(0, 0, 0, .5)',
  letterSpacing: 1,
  fontSize: '1.4em',
  color: palette.textColor
});