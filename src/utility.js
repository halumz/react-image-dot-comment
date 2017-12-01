const reminder = 1000.0;
const percent = 100000;

const setLocalData = state => {
  try {
    localStorage.setItem('reactDotImageState', JSON.stringify(state));
  } catch (error) {
    return error;
  }
};

const getLocalData = () => {
  const localData = localStorage.getItem('reactDotImageState');
  const data = localData
    ? JSON.parse(localData)
    : {
        images: [],
        points: {},
        comments: {},
        selectedImage: '',
        dimensions: {}
      };

  return {
    ...data,
    newPoint: null,
    selectedPoint: null,
    showAllComments: false,
    showPoints: true
  };
};
const setPoint = (dimensions, currentPosition) => {
  try {
    const { position } = currentPosition;
    const w = Math.round(reminder * position.x / dimensions.width);
    const h = Math.round(reminder * position.y / dimensions.height);
    const width = reminder < w ? Math.round(reminder) : w;
    const height = reminder < h ? Math.round(reminder) : h;
    return `${width * percent + height}`;
  } catch (e) {}
};
const getPointData = ({ id, dimensions }) => {
  const point = parseInt(id, 10);
  const width = Math.round(point / percent * dimensions.width / reminder);
  const height = Math.round((point % percent) * dimensions.height / reminder);
  return { width, height };
};

const timeDifference = givenTime => {
  givenTime = new Date(givenTime);
  const milliseconds = new Date().getTime() - givenTime.getTime();
  const numberEnding = number => {
    return number > 1 ? 's' : '';
  };
  const number = num => (num > 9 ? '' + num : '0' + num);
  const getTime = () => {
    let temp = Math.floor(milliseconds / 1000);
    const years = Math.floor(temp / 31536000);
    if (years) {
      const month = number(givenTime.getUTCMonth() + 1);
      const day = number(givenTime.getUTCDate());
      const year = givenTime.getUTCFullYear() % 100;
      return `${day}-${month}-${year}`;
    }
    const days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
      if (days < 28) {
        return days + ' day' + numberEnding(days);
      } else {
        const months = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ];
        const month = months[givenTime.getUTCMonth()];
        const day = number(givenTime.getUTCDate());
        return `${day} ${month}`;
      }
    }
    const hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
      return `${hours} hour${numberEnding(hours)} ago`;
    }
    const minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
      return `${minutes} minute${numberEnding(minutes)} ago`;
    }
    return 'now';
  };
  return getTime();
};
export { setLocalData, getLocalData, getPointData, setPoint, timeDifference };
