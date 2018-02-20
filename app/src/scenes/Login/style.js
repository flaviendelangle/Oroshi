export const paper = theme => ({
  height: 'auto',
  width: 300,
  margin: 'auto',
  backgroundColor: theme.paperBackground,
  color: theme.paperColor,
  position: 'absolute',
  top: '50%',
  right: 0,
  left: 0,
  transform: 'translateY(-50%)',
  padding: 22,
})

export const input = theme => ({
  color: theme.paperColor,
  borderColor: theme.paperColor,
})

export const flatButton = theme => ({
  color: theme.paperColor,
  textAlign: 'center',
  userSelect: 'none',
})

export const flatButtonLink = {
  fontWeight: 'bold',
  cursor: 'pointer',
}

export const button = {
  width: 150,
  margin: '20px auto',
  display: 'block',
}

export const buttonBackground = '#2196F3'
