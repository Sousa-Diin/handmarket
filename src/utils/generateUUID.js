const generateUUID = () => {
    return typeof crypto?.randomUUID === 'function'
      ? crypto.randomUUID()
      : '_' + Math.random().toString(36).substr(2, 9);
  };

export default generateUUID;