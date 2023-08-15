// Ваша задача создать список для хранения книг. Есть два поля input, куда нужно вводить название книги и автора. Добавьте проверку на то, что оба поля заполнены, если нет, то вызовите alert и сообщите об этом пользователю. При нажатии на кнопку автор и название книги должны добавляться в список с книгами. Затем добавьте возможность удалять элементы из списка с книгами при клике на них. После этого сделайте так, чтобы добавленные элементы сохранялись в LS, а при удалении элемента из списка книг он также удалялся из LS. Затем добавьте возможность загружать сохраненные в LS элменты при загрузке страницы.

const authorInput = document.querySelector('#authorName')
const bookInput = document.querySelector('#bookName')
const bookList = document.querySelector('#bookList')
const addBtn = document.querySelector('button')

bookList.style.border = '1px solid gray'
bookList.style.width = '300px'
bookList.style.minHeight = '20px'
bookList.style.borderRadius = '20px'

document.addEventListener(
  'DOMContentLoaded',
  loadElementsFromListForBookAndAuthorInLocalStorage
)

addBtn.addEventListener('click', handleClickOnBtn)
authorInput.addEventListener('keypress', focusOnNextElement)
bookInput.addEventListener('keypress', focusOnNextElement)

function focusOnNextElement(event) {
  if (event.key === 'Enter') {
    event.target.nextElementSibling.focus()
  }
}

function handleClickOnBtn() {
  const textInsideAuthorInput = authorInput.value
  const textInsideBookInput = bookInput.value
  const allValueTogether = `${authorInput.value}. "${bookInput.value}"`

  if (textInsideAuthorInput.length > 0 && textInsideBookInput.length > 0) {
    createLi(allValueTogether)
    saveAuthorAndBookInLocalStorage(allValueTogether)
    bookInput.value = ''
    authorInput.value = ''
    authorInput.focus()
  } else {
    alert('Заполните оба поля и нажмите на кнопку')
    bookInput.value = ''
    authorInput.value = ''
    authorInput.focus()
  }
}

function createLi(allValueTogether) {
  const newLiForBookList = document.createElement('li')
  newLiForBookList.innerHTML = allValueTogether
  newLiForBookList.style.cursor = 'pointer'
  newLiForBookList.addEventListener('click', removeLiFromTheBookList)

  bookList.append(newLiForBookList)
}

function removeLiFromTheBookList() {
  this.removeEventListener('click', removeLiFromTheBookList)
  removeLiFromListInLocalStorage(this.innerText)
  this.remove()
}

function saveAuthorAndBookInLocalStorage(element) {
  const listForBookAndAuthorFromLocalStorage =
    JSON.parse(localStorage.getItem('listForBookAndAuthor')) || []
  localStorage.setItem(
    'listForBookAndAuthor',
    JSON.stringify([...listForBookAndAuthorFromLocalStorage, element])
  )
}

function loadElementsFromListForBookAndAuthorInLocalStorage() {
  const listForBookAndAuthorFromLocalStorage =
    JSON.parse(localStorage.getItem('listForBookAndAuthor')) || []
  if (listForBookAndAuthorFromLocalStorage.length > 0) {
    for (let element of listForBookAndAuthorFromLocalStorage) {
      createLi(element)
    }
  }
}

function removeLiFromListInLocalStorage(removeElement) {
  const listForBookAndAuthorFromLocalStorage = JSON.parse(
    localStorage.getItem('listForBookAndAuthor')
  )

  localStorage.setItem(
    'listForBookAndAuthor',
    JSON.stringify(
      listForBookAndAuthorFromLocalStorage.filter(
        (element) => element !== removeElement
      )
    )
  )
}
