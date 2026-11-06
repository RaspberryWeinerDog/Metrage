function setMarketplaceLinks(type, query) {
    const q = encodeURIComponent(query);
    const wb = document.getElementById(`link-wb-${type}`);
    const ozon = document.getElementById(`link-ozon-${type}`);
    const ya = document.getElementById(`link-ya-${type}`);
    
    if (wb) wb.href = `https://www.wildberries.ru/catalog/0/search.aspx?search=${q}`;
    if (ozon) ozon.href = `https://www.ozon.ru/search/?text=${q}`;
    if (ya) ya.href = `https://market.yandex.ru/search?text=${q}`;
}

async function saveCalculation(type, resultData) {
    if (!localStorage.getItem('token')) return alert('Войдите в аккаунт, чтобы сохранить расчет!');
    
    const data = await fetchAPI('/history', {
        method: 'POST',
        body: JSON.stringify({ calc_type: type, result_data: resultData })
    });
    
    if (data.success) alert('Расчет успешно сохранен в личный кабинет!');
    else alert('Ошибка сохранения');
}

// Логика для страницы КРАСКИ
if (document.getElementById('form-paint')) {
    document.getElementById('form-paint').addEventListener('submit', async function(e) {
        e.preventDefault();
        const data = {
            L: +document.getElementById('p-length').value, W: +document.getElementById('p-width').value, H: +document.getElementById('p-height').value,
            doorW: +document.getElementById('p-door-w').value, doorH: +document.getElementById('p-door-h').value,
            winW: +document.getElementById('p-win-w').value, winH: +document.getElementById('p-win-h').value,
            layers: +document.getElementById('p-layers').value, coverage: +document.getElementById('p-coverage').value,
            canVol: +document.getElementById('p-can').value, reserve: +document.getElementById('p-reserve').value
        };
        const result = await fetchAPI('/calculate/paint', { method: 'POST', body: JSON.stringify(data) });
        
        if(result.success) {
            document.getElementById('res-paint').innerHTML = `
                <div class="result-title">ИТОГ: Необходимо ${result.cans} банок(и).</div>
                <div>Площадь стен: ${result.details.sWalls} м²</div>
                <div>Полезная площадь: ${result.details.sUseful} м²</div>
            `;
            document.getElementById('res-paint').style.display = 'block';
            document.getElementById('mp-paint').style.display = 'block';
            document.getElementById('save-paint').classList.remove('hidden');
            setMarketplaceLinks('paint', 'краска для стен');
            
            document.getElementById('save-paint').onclick = () => saveCalculation('paint', result);
        }
    });
}

// Логика для страницы ПЛИТКИ
if (document.getElementById('form-tile')) {
    document.getElementById('form-tile').addEventListener('submit', async function(e) {
        e.preventDefault();
        const data = {
            L: +document.getElementById('t-length').value, W: +document.getElementById('t-width').value,
            tileArea: +document.getElementById('t-tile-area').value, packCount: +document.getElementById('t-pack-count').value,
            reserve: +document.getElementById('t-reserve').value
        };
        const result = await fetchAPI('/calculate/tile', { method: 'POST', body: JSON.stringify(data) });
        
        if(result.success) {
            document.getElementById('res-tile').innerHTML = `
                <div class="result-title">ИТОГ: Необходимо ${result.packs} упаковок(ки).</div>
                <div>Площадь поверхности: ${result.details.area} м²</div>
                <div>Требуется плиток: ${result.details.totalTiles} шт.</div>
            `;
            document.getElementById('res-tile').style.display = 'block';
            document.getElementById('mp-tile').style.display = 'block';
            document.getElementById('save-tile').classList.remove('hidden');
            setMarketplaceLinks('tile', 'керамическая плитка');
            
            document.getElementById('save-tile').onclick = () => saveCalculation('tile', result);
        }
    });
}

// Логика для страницы ОБОЕВ
if (document.getElementById('form-wallpaper')) {
    document.getElementById('form-wallpaper').addEventListener('submit', async function(e) {
        e.preventDefault();
        const data = {
            L: +document.getElementById('w-length').value, W: +document.getElementById('w-width').value, H: +document.getElementById('w-height').value,
            rollW: +document.getElementById('w-roll-w').value, rollL: +document.getElementById('w-roll-l').value,
            reserve: +document.getElementById('w-reserve').value
        };
        const result = await fetchAPI('/calculate/wallpaper', { method: 'POST', body: JSON.stringify(data) });
        
        if(result.success) {
            document.getElementById('res-wallpaper').innerHTML = `
                <div class="result-title">ИТОГ: Необходимо ${result.rolls} рулонов.</div>
                <div>Периметр: ${result.details.perimeter} м</div>
                <div>Площадь стен: ${result.details.sWalls} м²</div>
            `;
            document.getElementById('res-wallpaper').style.display = 'block';
            document.getElementById('mp-wallpaper').style.display = 'block';
            document.getElementById('save-wallpaper').classList.remove('hidden');
            setMarketplaceLinks('wallpaper', 'обои');
            
            document.getElementById('save-wallpaper').onclick = () => saveCalculation('wallpaper', result);
        }
    });
}

// Логика для страницы ПОЛА/ПОТОЛКА
if (document.getElementById('form-floor')) {
    document.getElementById('form-floor').addEventListener('submit', async function(e) {
        e.preventDefault();
        const data = {
            L: +document.getElementById('f-length').value, W: +document.getElementById('f-width').value,
            packArea: +document.getElementById('f-pack-area').value, reserve: +document.getElementById('f-reserve').value
        };
        const result = await fetchAPI('/calculate/floor', { method: 'POST', body: JSON.stringify(data) });
        
        if(result.success) {
            document.getElementById('res-floor').innerHTML = `
                <div class="result-title">ИТОГ: Необходимо ${result.packs} упаковок/листов.</div>
                <div>Площадь поверхности: ${result.details.area} м²</div>
            `;
            document.getElementById('res-floor').style.display = 'block';
            document.getElementById('mp-floor').style.display = 'block';
            document.getElementById('save-floor').classList.remove('hidden');
            setMarketplaceLinks('floor', 'напольное покрытие');
            
            document.getElementById('save-floor').onclick = () => saveCalculation('floor', result);
        }
    });
}