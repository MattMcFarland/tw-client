export const shareFacebook = () => {
  window.location = 'https://www.facebook.com/sharer/sharer.php?u=' + window.location;
}

export const shareTwitter = () => {
  window.location = 'https://twitter.com/intent/tweet?text=' + window.location;
}

export const shareEmail = () => {
  window.location = 'mailto:?subject=I wanted you to see this site&amp;body=Check out this site ' + window.location;
}
