const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}

const btnMenu = document.querySelector('.mmenu');
const leftMenu = document.querySelector('.left');

const openMenu = (e) => {
  e.preventDefault();
  leftMenu.classList.toggle('active');
}

btnMenu.addEventListener('click', openMenu);


/**
 * Query to customers.json
 * @returns null || [];
 */
 const getList = async (queryPath) => {
  try {
      const query = await fetch(queryPath);
      const response = await query.json();

      if (!response) {
          console.error(`Response error #${queryPath}`);
          return null;
      }

      return response;

  } catch(error) {
      console.error(error);
      return null;
  }
};

/**
*
* @param list is Array
* @returns STRING
*/
const createListDOM = (list = []) => {
  let response = '';

  for (let i = 0; i < list.length; i++) {
      const item = list[i];



      response += `<tr class="item">
          <td>${item.name}</td>
          <td>${item.company}</td>
          <td>${item.phone}</td>
          <td>${item.mail}</td>
          <td>${item.country}</td>
          <td>
            <span class="status ${item.status && 'active' || ''}">
              ${item.status ? 'Active' : 'Inactive' }
            </span>
          </td>
      </tr>`;
  }

  return response;
};

/**
*
* @param container is DOM element
* @param queryPath is String
*/
const generateUI = async (container, queryPath = 'customers.json') => {
  if (!container) {
      console.error('@generateUI - Container is required!');
      return;
  }

  const list = await getList(queryPath);

  if (!list) return;

  const generatedUIString = createListDOM(list);
  container.innerHTML = generatedUIString;
};

window.addEventListener('load', () => {
  const container = document.getElementById('customers-container');
  generateUI(container);
});


window.addEventListener('resize', appHeight);
appHeight();