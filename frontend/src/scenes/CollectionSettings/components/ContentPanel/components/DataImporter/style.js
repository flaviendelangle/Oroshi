export const source = {
  textAlign: 'left',
  marginBottom: 20
};

export const dropZone = (dropped) => ({
  padding: 10,
  width: 300,
  maxWidth: '50%',
  height: 50,
  lineHeight: '50px',
  textAlign: 'center',
  margin: 'auto',
  borderColor: dropped ? '#ff6f00' : 'rgb(102, 102, 102)',
  color: dropped ? '#ff6f00' : 'rgb(238, 238, 238)',
  borderStyle: 'dashed',
  borderRadius: 5,
  cursor: 'pointer'
});

export const button = {
  margin: '12px',
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)'
};
