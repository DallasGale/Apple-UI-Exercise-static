let renderNavigation = () => {
    console.log("🚀...liftoff!!");
  
    // -------------------Set Global Variables-------------------
    const nav = document.getElementById("nav");
    let allOtherCities = null;
    let cities = null;
    let firstCity = null;
    let html = null;
  
    // -------------------Fetch Navigation Data-------------------
    fetch("navigation.json").then(res => {
      if (res.status !== 200) {
        console.error(
          "Looks like the data could not be fetched!!: ",
          res.statusText
        );
      } else {
        res.json().then(resData => {
          let iterator = 2;
  
          cities = resData.cities;
          firstCity = cities[0];
          allOtherCities = cities.slice(1);
          html = `
                      <ul id="nav-list" class="nav-list">
                          <li class="nav-list__items">
                              <a id='${ firstCity.section }' class="nav-list__items-link" href="#" tabindex="1">
                                  ${ firstCity.label }
                              </a>
                          </li>
                          
  
                          ${allOtherCities.map(
                            city => `
                              <li class="nav-list__items">
                                  <a id='${ firstCity.section }' class="nav-list__items-link" href="#" id="" tabindex='${iterator++}'>
                                      ${city.label}
                                  </a>
                              </li>`
                          )}
                          <div id='active-nav-line' class='active-nav-line'></div>
                      </ul>
                  `;
  
          // Insert above html to DOM
          nav.innerHTML = html.replace(/,/g, "");
  
          const allNavAnchors = document.querySelectorAll("a");
          const activeNavItemLine = document.getElementById("active-nav-line");
          allNavAnchors[0].classList.add("active");
  
          // On page load retrieve active item position & width and...
          let activeItemWidth = Math.round(
            allNavAnchors[0].getBoundingClientRect().width
          ).toString();
          let activeItemPosition = allNavAnchors[0].offsetLeft.toString();
  
          // ...assign it to the 'active-nav-item' style properties
          activeNavItemLine.style.width = `${activeItemWidth}px`;
          activeNavItemLine.style.left = `${activeItemPosition}px`;
  
          // Loop over 'a' tags to find the active item
          allNavAnchors.forEach(el => {
            // Assign 'active' class to the first nav item on page load
            // Add event listener's to all nav 'a' tags to listen for 'focusin' event
            el.addEventListener("click", function handleClick() {
              let clickedElement = this;
              let current = document.getElementsByClassName("active");
              current[0].className = current[0].className.replace(" active", "");
              clickedElement.className += " active";
  
              // When a new nav 'a' tag is 'active', re-assign the width & position and...
              activeItemWidth = Math.round(
                clickedElement.getBoundingClientRect().width
              ).toString();
              activeItemPosition = clickedElement.offsetLeft.toString();
  
              // ...set the 'active-nav-line' width & position from above.
              activeNavItemLine.style.width = `${activeItemWidth}px`;
              activeNavItemLine.style.left = `${activeItemPosition}px`;
  
              // Add CSS transition animation.
              // NOTE: If this was added by default in the stylesheet, when the window is resized the line would animate to the new position and would appear not to 'stick' to the nav item.
              activeNavItemLine.style.transition = "all 0.3s";
              return;
            });
          });
  
          // -------------------Function to get the rendered/updated position of activeItem when window is resized/responsive-------------------
          const ResponsivePosition = () => {
            allNavAnchors.forEach(el => {
              // While window is re-sizing remove the transition animation that had been applied on 'focusin'
              activeNavItemLine.style.transition = "none";
  
              if (el.classList.contains("active")) {
                activeItemWidth =
                  Math.round(el.getBoundingClientRect().width).toString() + "px";
                activeItemPosition = Math.round(el.offsetLeft).toString() + "px";
  
                activeNavItemLine.style.left = activeItemPosition;
                activeNavItemLine.style.width = activeItemWidth;
              }
            });
          };
          window.addEventListener("resize", ResponsivePosition);
        });
      }
    });
  };
  
  renderNavigation();
  