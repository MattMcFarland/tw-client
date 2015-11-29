export default function () {

  let pageJSON = document.getElementById('json');

  if (pageJSON) {

    try {
      return JSON.parse(pageJSON.innerText).title;
    } catch (e) {
      return 'all';
    }

  } else {
    return null;
  }


}
