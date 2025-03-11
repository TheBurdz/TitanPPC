(function(){
    try {
        if(document.getElementById('custom-popup')) {
            document.getElementById('custom-popup').remove();
            return;
        }

        let p = document.createElement('div');
        p.id = 'custom-popup';
        p.style = "position:fixed;top:20px;right:40px;width:250px;background:white;border:1px solid black;box-shadow:2px 2px 10px rgba(0,0,0,0.3);padding:10px;z-index:9999;font-family:Arial,sans-serif;border-radius:8px;text-align:center;";
        
        const logo = new Image(200, 40); // width, height
	logo.src = "https://raw.githubusercontent.com/TheBurdz/TitanPPC/refs/heads/main/titan-network-logo.svg";
	p.appendChild(logo);

        let t = document.createElement('div');
        t.textContent = 'Amazon PPC Suggested Actions';
        t.style = "font-size:12px;font-weight:bold;margin-top:10px;margin-bottom:10px;";
        p.appendChild(t);

        // Create Campaign Filters dropdown
        let dropdownHeader = document.createElement('div');
        dropdownHeader.textContent = '▷ Campaign Filters';
        dropdownHeader.style = "background:white;border:1px solid #DEDFE0;box-shadow:1px 1px 5px rgba(0,0,0,0.3);color:black;padding:5px;margin:5px;border-radius:5px;cursor:pointer;";
        dropdownHeader.onclick = function() {
            filtersContainer.style.display = filtersContainer.style.display === 'none' ? 'block' : 'none';
            dropdownHeader.textContent = filtersContainer.style.display === 'none' ? '▷ Campaign Filters' : '▽ Campaign Filters';
        };
        p.appendChild(dropdownHeader);

        let filtersContainer = document.createElement('div');
        filtersContainer.style = "display:none;margin-top:5px;";

        function ensureFilterFormOpen(callback) {
            let filterToggleButton = document.querySelector('.js-toggle-filter');
            if (filterToggleButton && !filterToggleButton.classList.contains('active')) {
                console.log('Opening filter form...');
                filterToggleButton.click();
                setTimeout(callback, 500);
            } else {
                callback();
            }
        }

        function clearAllInputs() {
            let inputs = document.querySelectorAll('form input[type="text"], form input[type="number"], form input[type="email"], form input[type="password"]');
            inputs.forEach(input => input.value = '');
            
            let selects = document.querySelectorAll('form select');
            selects.forEach(select => select.selectedIndex = 0);
            
            console.log('Cleared all form inputs.');
        }

        function getPPC_CVR(){
            try{
                let w = document.querySelector('.widget-wrapper.show.selected.widget-custom_range');
                if(!w) throw 'PPC Widget not found';
                let l = Array.from(w.querySelectorAll('.label-wrapper .section-label span')).find(s => s.textContent.trim() === 'PPC CVR');
                if(!l) throw 'PPC CVR label not found';
                let v = l.closest('.label-wrapper').parentElement.querySelector('.value-main');
                if(!v) throw 'PPC CVR value not found';
                return parseFloat(v.textContent.trim().replace('%',''));
            } catch(e){
                alert('Error retrieving PPC CVR: ' + e);
                return null;
            }
        }

        function setCvrMaxValue(){
            ensureFilterFormOpen(() => {
                clearAllInputs();
                let v = getPPC_CVR();
                if(v !== null){
                    let i = document.querySelector('input[name="cvr[max]"]');
                    if (i) {
                        i.value = v;
                        console.log('Set CVR Max:', v);
                        clickFilterButton();
                        
                        // Wait for campaigns to update, then open placements
                				setTimeout(openAllPlacements, 1500);
                    } else {
                        alert('CVR Max input field not found');
                    }
                }
            });
        }

        function setAcosMaxValue(){
            ensureFilterFormOpen(() => {
                clearAllInputs();
                try {
                    let i = document.querySelector('input[name="acos[max]"]');
                    if (i) {
                        i.value = 15;
                        console.log('Set ACoS Max: 15');
                        clickFilterButton();
                    } else {
                        alert('ACoS Max input field not found');
                    }
                } catch(e) {
                    alert('Error setting ACoS Max: ' + e);
                }
            });
        }

	function setAcosMaxOrdersValue(){
            ensureFilterFormOpen(() => {
                clearAllInputs();
                try {
                    let i = document.querySelector('input[name="orders[max]"]');
                    if (i) {
                        i.value = 20;
                        console.log('Set Orders Max: 20');
                        clickFilterButton();
                    } else {
                        alert('Orders Max input field not found');
                    }
                } catch(e) {
                    alert('Error setting Orders Max: ' + e);
                }
            });
        }

	// New Clicks No Orders Function    
	function setClicksNoOrdersValue(){
    	ensureFilterFormOpen(() => {
        clearAllInputs();
        try {
            let valuesToSet = {
                "orders[max]": 0,  // Set Orders Max to 0
                "clicks[min]": 1   // Set Clicks Min to 1
            };

            Object.keys(valuesToSet).forEach(fieldName => {
                let inputField = document.querySelector(`input[name="${fieldName}"]`);
                if (inputField) {
                    inputField.value = valuesToSet[fieldName];
                    console.log(`Set ${fieldName} to ${valuesToSet[fieldName]}`);
                } else {
                    console.warn(`Input field not found: ${fieldName}`);
                }
            });

            clickFilterButton(); // Apply filters after setting values

        } catch(e) {
            alert('Error setting multiple values: ' + e);
        }
    	});
	}


        function setAcosMinValue(){
            ensureFilterFormOpen(() => {
                clearAllInputs();
                try {
                    let i=document.querySelector('input[name="acos[min]"]');
                    if (i) {
                        i.value = 35;
                        console.log('Set ACoS Min: 35');
                        clickFilterButton();
                    } else {
                        alert('ACoS Min input field not found');
                    }
                } catch(e) {
                    alert('Error setting ACoS Min: '+e);
                }
            });
        }

	function setAcosMin70Value(){
            ensureFilterFormOpen(() => {
                clearAllInputs();
                try {
                    let i=document.querySelector('input[name="acos[min]"]');
                    if (i) {
                        i.value = 70;
                        console.log('Set ACoS Min: 70');
                        clickFilterButton();
                    } else {
                        alert('ACoS Min input field not found');
                    }
                } catch(e) {
                    alert('Error setting ACoS Min: '+e);
                }
            });
        }

        function clickFilterButton(){
            let filterButton = document.querySelector('.js-table-filter-submit');
            if (filterButton) {
                filterButton.click();
                console.log('Filter button clicked.');
            } else {
                alert('Filter button not found.');
            }
        }

        function toggleFilterForm(){
            let filterToggleButton = document.querySelector('.js-toggle-filter');
            if (filterToggleButton) {
                filterToggleButton.click();
                console.log('Toggled filter form.');
            } else {
                alert('Filter form button not found.');
            }
        }
        
        function openAllPlacements() {
    try {
        let campaignRows = document.querySelectorAll('.dataTable tr[class^="js-campaign-"]');

        if (campaignRows.length === 0) {
            console.log("No campaigns found in filtered results.");
            return;
        }

        campaignRows.forEach(row => {
            let placementButton = row.querySelector('.col-placement .btn-campaign-placements-show');
            if (placementButton) {
                placementButton.click();
                console.log(`Opened placements for: ${row.className}`);
            }
        });

    } catch (error) {
        console.error('Error opening placement sections:', error);
    }
}


        function b(t, c){
            let btn = document.createElement('button');
            btn.textContent = t;
            btn.style = "display:block;margin:5px auto;padding:5px;width:90%;border:none;background:#d49700;color:white;border-radius:5px;cursor:pointer;";
            btn.onclick = c;
            filtersContainer.appendChild(btn);
        }
        
        function w(x){
            let lne = document.createElement('text');
            lne.textContent = x;
            lne.style = "display:block;font-size:12px;margin:5px auto;padding:5px;width:90%;border:none;background:white;color:black;border-radius:5px;cursor:pointer;";
            filtersContainer.appendChild(lne);
        }

        w('Use 30 Day Lookback Period');
        // b('Toggle Filter Form', toggleFilterForm);
        // b('Clear Form', clearAllInputs);
        b('Low CVR - Below AVG', setCvrMaxValue);
        b('High ACoS > 35%', setAcosMinValue);
        b('Low ACoS < 15%', setAcosMaxValue);
        // b('Apply Filters', clickFilterButton);
        w('Use 60+ Day Lookback Period');
        b('Clicks w/ No Sales', setClicksNoOrdersValue);
        b('High ACoS > 70%', setAcosMin70Value);
        b('Low Orders < 20', setAcosMaxOrdersValue);

        p.appendChild(filtersContainer);

        let c = document.createElement('button');
        c.textContent = 'Close';
        c.style = "margin-top:10px;padding:5px;background:#1dc9b7;color:white;border:none;border-radius:5px;cursor:pointer;";
        c.onclick = () => p.remove();
        p.appendChild(c);

        document.body.appendChild(p);
    } catch(e) {
        alert('Error initializing bookmarklet: ' + e);
    }
})();
