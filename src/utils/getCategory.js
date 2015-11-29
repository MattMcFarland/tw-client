export default function () {

  let path = window.location.pathname.split('/');
  let pageJSON = document.getElementById('json');

  if (pageJSON) {

    try {
      return JSON.parse(pageJSON.innerHTML).category;
    } catch (e) {
      return 'all';
    }

  } else {
    try {
      return path[1] === 'category' ? path[2] : 'all';
    } catch (err) {
      return 'all';
    }
  }


}
