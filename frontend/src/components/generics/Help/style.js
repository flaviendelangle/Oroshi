export const elementHelp = {
  position: 'relative',
  height: 380,
  margin: '20px auto 0 auto',
  maxWidth: 1200,
};

export const title = palette => ({
  color: palette.titleColor,
  fontSize: '1.8em',
  paddingLeft: 20,
  letterSpacing: 1
});

export const publicContainer = palette => ({
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  transform: 'translateY(-50%)',
  color: palette.textColor,
  textShadow: '0 2px 4px rgba(0, 0, 0, .5)',
  lineHeight: '3.5em',
  letterSpacing: 1
});

export const publicContent = palette => ({
  display: 'inline-block',
  fontSize: '2.3em',
  marginRight: 10
});