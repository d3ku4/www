function openTab(tabId) {
    const activeTabContent = document.querySelector('.tab-content.active');
    if (activeTabContent) {
        activeTabContent.classList.remove('active');
    }

    const activeTabButton = document.querySelector('.tab-button.active');
    if (activeTabButton) {
        activeTabButton.classList.remove('active');
    }

    document.getElementById(tabId).classList.add('active');

    const newActiveButton = document.querySelector(`.tab-button[data-tab="${tabId}"]`);
    if (newActiveButton) {
        newActiveButton.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('.statsitem');
    const slots = document.querySelectorAll('.invitems');

    items.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', item.id);
            setTimeout(() => {
                item.classList.add('hide');
            }, 0);
        });

        item.addEventListener('dragend', () => {
            item.classList.remove('hide');
        });
    });

    slots.forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            const item = document.getElementById(itemId).cloneNode(true);
            const img = item.querySelector('img');

            img.style.width = '80px';
            img.style.height = '70px';
            img.style.border = '0.7px solid gray';
            img.style.borderRadius = '4px';

            item.querySelector('p').remove();

            slot.innerHTML = '';
            slot.appendChild(img);

            addItem(itemId);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    let charlvl = 1;
    const lvltext = document.querySelector('.lvltext');

    let Attributes = {
        str: 19,
        agl: 21,
        int: 15
    };

    let AttributesGrowth = {
        strG: 2.0,
        aglG: 3.4,
        intG: 1.7
    };

    let baseStats = {
        health: 538,
        healthRegen: 2.9,
        attackSpeed: 131,
        damage: 57,
        armor: 4.5,
        mana: 255,
        manaRegen: 0.75,
        magicResist: 26,
        evade: 21.5,
        moveSpeed: 310,
        resist: 21
    };

    let currentStats = { ...baseStats };
    let inventory = [];

    const items = {
        'item1': {
            name: 'Wraith Band',
            str: 2, agl: 5, int: 2, attackSpeed: 5, armor: 1.75
        },
        'item2': {
            name: 'Magic Wand',
            str: 3, agl: 3, int: 3
        },
        'item3': {
            name: 'Power Threads',
            agl: 10, moveSpeed: 55, attackSpeed: 25
        },
        'item4': {
            name: 'Battle Fury',
            damage: 65, healthRegen: 7.5, manaRegen: 3.75
        },
        'item5': {
            name: 'Desolator',
            damage: 50
        },
        'item6': {
            name: 'Black King Bar',
            str: 10, damage: 24
        },
        'item7': {
            name: 'Abyssal Blade',
            damage: 35, health: 250, healthRegen: 10, str: 10
        },
        'item8': {
            name: 'Satanic',
            str: 25, damage: 25
        }
    };

    function calculateStats(level) {
        let currentAttributes = {
            str: Attributes.str + (level - 1) * AttributesGrowth.strG,
            agl: Attributes.agl + (level - 1) * AttributesGrowth.aglG,
            int: Attributes.int + (level - 1) * AttributesGrowth.intG
        };

        inventory.forEach(item => {
            currentAttributes.str += items[item].str || 0;
            currentAttributes.agl += items[item].agl || 0;
            currentAttributes.int += items[item].int || 0;
        });

        currentStats.health = baseStats.health + (currentAttributes.str - Attributes.str) * 22;
        currentStats.healthRegen = baseStats.healthRegen + (currentAttributes.str - Attributes.str) * 0.1;
        currentStats.attackSpeed = baseStats.attackSpeed + (currentAttributes.agl - Attributes.agl);
        currentStats.damage = baseStats.damage + (currentAttributes.agl - Attributes.agl);
        currentStats.armor = baseStats.armor + (currentAttributes.agl - Attributes.agl) * 0.17;
        currentStats.mana = baseStats.mana + (currentAttributes.int - Attributes.int) * 12;
        currentStats.manaRegen = baseStats.manaRegen + (currentAttributes.int - Attributes.int) * 0.05;
        currentStats.magicResist = baseStats.magicResist + (currentAttributes.int - Attributes.int) * 0.1;
        currentStats.evade = baseStats.evade + (level - 1) * 1.5;
        currentStats.resist = baseStats.resist + ((0.06 * currentStats.armor) / (1 + 0.06 * currentStats.armor));

        inventory.forEach(item => {
            const itemStats = items[item];
            currentStats.health += itemStats.health || 0;
            currentStats.healthRegen += itemStats.healthRegen || 0;
            currentStats.attackSpeed += itemStats.attackSpeed || 0;
            currentStats.damage += itemStats.damage || 0;
            currentStats.armor += itemStats.armor || 0;
            currentStats.mana += itemStats.mana || 0;
            currentStats.manaRegen += itemStats.manaRegen || 0;
            currentStats.magicResist += itemStats.magicResist || 0;
            currentStats.moveSpeed += itemStats.moveSpeed || 0;
        });

        document.querySelector('.bar-green .bar-text').textContent = currentStats.health.toFixed(0);
        document.querySelector('.bar-green .bar-text-hp').textContent = `+${currentStats.healthRegen.toFixed(1)}`;
        document.querySelector('.AttackSpeed').textContent = currentStats.attackSpeed.toFixed(0);
        document.querySelector('.Damage').textContent = currentStats.damage.toFixed(0);
        document.querySelector('.Armor').textContent = currentStats.armor.toFixed(1);
        document.querySelector('.Regen').textContent = currentStats.healthRegen.toFixed(2);
        document.querySelector('.bar-blue .bar-text').textContent = currentStats.mana.toFixed(0);
        document.querySelector('.bar-blue .bar-text-mana').textContent = `+${currentStats.manaRegen.toFixed(1)}`;
        document.querySelector('.ManaRegen').textContent = `${currentStats.manaRegen.toFixed(2)}`;
        document.querySelector('.MagicResist').textContent = `${currentStats.magicResist.toFixed(1)}%`;
        document.querySelector('.Evade').textContent = `${currentStats.evade.toFixed(1)}%`;
        document.querySelector('.Resist').textContent = `${currentStats.resist.toFixed(0)}%`;

        document.querySelector('.guiattributes li:nth-child(1) b').textContent = currentAttributes.str.toFixed(0);
        document.querySelector('.guiattributes li:nth-child(2) b').textContent = currentAttributes.agl.toFixed(0);
        document.querySelector('.guiattributes li:nth-child(3) b').textContent = currentAttributes.int.toFixed(0);
    }

    function addItem(itemId) {
        if (!inventory.includes(itemId)) {
            inventory.push(itemId);
            calculateStats(charlvl);
        }
    }

    function removeItem(itemId) {
        const index = inventory.indexOf(itemId);
        if (index > -1) {
            inventory.splice(index, 1);
            calculateStats(charlvl);
        }
    }

    window.updateCharLevel = (change) => {
        charlvl += change;
        if (charlvl > 30) charlvl = 30;
        if (charlvl < 1) charlvl = 1;
        lvltext.textContent = charlvl;
        calculateStats(charlvl);
    };

    window.resetCharLevel = () => {
        charlvl = 1;
        lvltext.textContent = charlvl;
        inventory = [];
        calculateStats(charlvl);

        const slots = document.querySelectorAll('.invitems');
        slots.forEach(slot => {
            slot.innerHTML = '';
        });
    };

    lvltext.textContent = charlvl;
    calculateStats(charlvl);
});