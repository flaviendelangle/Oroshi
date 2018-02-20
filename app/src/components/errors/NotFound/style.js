export const container = palette => ({
  textAlign: 'center',
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  transform: 'translateY(-50%)',
  color: palette.textColor,
  textShadow: '0 2px 4px rgba(0, 0, 0, .5)',
  lineHeight: '3.5em',
  letterSpacing: 1,
})

export const summary = () => ({
  display: 'inline-block',
  fontSize: '2.3em',
  marginRight: 10,
})

export const errorCode = palette => ({
  display: 'inline-block',
  color: palette.titleColor,
  fontSize: '1.5em',
})

export const details = () => ({
  fontSize: '1.4em',
})
