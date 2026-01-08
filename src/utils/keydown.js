export const keydown = {
  enter : (callback, options = {}) => (e)  => {
    if(e.key === "Enter" && !options.shift && !e.shiftKey){
      if(options.preventDefault) e.preventDefault()
        callback(e)
    }
  },

  escape: (callback, options = {}) => (e) => {
    if (e.key === 'Escape') {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  space: (callback, options = {}) => (e) => {
    if (e.key === ' ' || e.code === 'Space') {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  arrowUp: (callback, options = {}) => (e) => {
    if (e.key === 'ArrowUp') {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  arrowDown: (callback, options = {}) => (e) => {
    if (e.key === 'ArrowDown') {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  arrowLeft: (callback, options = {}) => (e) => {
    if (e.key === 'ArrowLeft') {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  arrowRight: (callback, options = {}) => (e) => {
    if (e.key === 'ArrowRight') {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  tab: (callback, options = {}) => (e) => {
    if (e.key === 'Tab') {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  // Backspace key
  backspace: (callback, options = {}) => (e) => {
    if (e.key === 'Backspace') {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  // Delete key
  delete: (callback, options = {}) => (e) => {
    if (e.key === 'Delete') {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  // Modifier combinations
  ctrlEnter: (callback, options = {}) => (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  shiftEnter: (callback, options = {}) => (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      if (options.preventDefault) e.preventDefault();
      callback(e);
    }
  },

  // Custom key handler
  custom: (key, callback, options = {}) => (e) => {
    const matches = Array.isArray(key)
      ? key.includes(e.key)
      : e.key === key;
    
    if (matches) {
      const modifiersMatch =
        (!options.ctrl || e.ctrlKey || e.metaKey) &&
        (!options.shift || e.shiftKey) &&
        (!options.alt || e.altKey);
      
      if (modifiersMatch) {
        if (options.preventDefault) e.preventDefault();
        callback(e);
      }
    }
  },

  // Combine multiple handlers
  combine: (...handlers) => (e) => {
    handlers.forEach(handler => handler(e));
  }
}

export const attachKeyHandlers = (element, handlers) => {
  const composedHandler = (e) => {
    Object.values(handlers).forEach(handler => {
      if (typeof handler === 'function') {
        handler(e);
      }
    });
  };
  
  element.addEventListener('keydown', composedHandler);
  
  return () => element.removeEventListener('keydown', composedHandler);
};