module.exports = (options) => {
  if (options && typeof options === 'object') {
    if (options.hasOwnProperty('target') || options.target === undefined || options.target === null || options.target === '') {
      const target = document.querySelector(options.target);
      if (target) {
        // minimum requirements are met so here's main package body
        const lib = {
          dom: {
            tile: target,
            counter: null,
            notification: null,
            icon: null,
          },
          animation: options.animation || 'fade', // available values: 'fade', 'none', TODO: 'rotate-horizontal', 'rotate-vertical',
          unreadNotifications: options.unreadNotifications || [], // TODO: create getter/setter that will execute tile render/animation etc.
          resetStateAfterClick: options.resetStateAfterClick || true,
          clickCallback: options.clickCallback || (() => false),
          gui: {
            icon: options.icon || 'livetile__icon--default',
            name: options.icon || 'livetile.js',
            colors: {
              tile: options.colors && options.colors.tile ? options.colors.tile : '#eee',
              font: options.font && options.colors.font ? options.colors.font : '#eee',
            },
          },
          methods: {
            renderTile: null
            },
          },
        };
        lib.methods.renderTile = () => {
          target.innerHTML = `<div class="livetile__wrapper" style="background-color: ${lib.gui.colors.tile}; color: ${lib.gui.colors.font}">
            <div class="livetile__icon ${lib.gui.icon}"></div>
            <div class="livetile__name">${lib.gui.name}</div>
            ${lib.unreadNotifications && lib.unreadNotifications.length ?
              '<div class="livetile__counter">' + lib.unreadNotifications.length + '</div>' : ''}
          </div>`
        };
        return lib;
      } else {
        throw new Error('Target has not been found in DOM tree');
      }
    } else {
      throw new Error('Option target is not defined');
    }
  } else {
    throw new Error('Options are not defined or not an object');
  }
};
