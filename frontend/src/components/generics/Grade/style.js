export const CONFIG = {
  thickness: 10,
  diameter: 80,
  lineHeight: 20
};

export const externalCircle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: CONFIG.diameter,
  height: CONFIG.diameter,
  backgroundColor: '#90A4AE',
  borderRadius: '50%',
  boxShadow: '6px 6px 10px rgba(0,0,0,0.6)'
};

export const innerCircle = {
  position: 'absolute',
  top: CONFIG.thickness,
  left: CONFIG.thickness,
  width: (CONFIG.diameter - 2*CONFIG.thickness),
  height: CONFIG.lineHeight,
  backgroundColor: '#ECEFF1',
  borderRadius: '50%',
  color: 'black',
  fontSize: CONFIG.lineHeight,
  fontWeight: 'bold',
  padding: String(CONFIG.diameter/2 - CONFIG.thickness - CONFIG.lineHeight/2) + 'px 0',
  textAlign: 'center',
};

export const arc = ({ quarter, degree, value }) => {
  
  const angle = Math.min(quarter*90, degree) - 45;
  const gradeColor = color(value);

  return {
    position: 'absolute',
    top: 0,
    left: 0,
    width: (CONFIG.diameter - 2*CONFIG.thickness),
    height: (CONFIG.diameter - 2*CONFIG.thickness),
    borderRadius: '50%',
    border: String(CONFIG.thickness) + 'px solid',
    borderColor: 'transparent ' + gradeColor + ' transparent transparent',
    transform: 'rotate(' + angle + 'deg)'
  };
};

export const circle = {
  width: CONFIG.diameter,
  height: CONFIG.diameter
};

export const cover = (degree) => ({
  display: (degree > 90 ? 'none' : 'block'),
  position: 'absolute',
  top: 0,
  left: 0,
  width: (CONFIG.diameter - 2 * CONFIG.thickness),
  height: (CONFIG.diameter - 2 * CONFIG.thickness),
  backgroundColor: '#90A4AE'
});

export const color = value => {
  if (value >= 6.67) {
    return '#1DE9B6';
  } else if (value > 3.33) {
    return '#FFCA28';
  } else {
    return '#D32F2F';
  }
};