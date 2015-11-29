export default function () {

  let pageJSON = document.getElementById('json');

  if (pageJSON) {

    try {
      return JSON.parse(pageJSON.innerHTML).title;
    } catch (e) {
      return 'all';
    }

  } else {
    return null;
  }


}
