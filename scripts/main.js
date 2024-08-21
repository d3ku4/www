function openTab(tabId) {
    const activeTabContent = document.querySelector(".tab-content.active");
    if (activeTabContent) {
        activeTabContent.classList.remove("active");
    }

    const activeTabButton = document.querySelector(".tab-button.active");
    if (activeTabButton) {
        activeTabButton.classList.remove("active");
    }

    document.getElementById(tabId).classList.add("active");

    const newActiveButton = document.querySelector(
        `.tab-button[data-tab="${tabId}"]`,
    );
    if (newActiveButton) {
        newActiveButton.classList.add("active");
    }
}
// Initial attributes and base stats
const Attributes = {
    str: 19,
    agl: 21,
    int: 15,
};

const AttributesGrowth = {
    strG: 2.0,
    aglG: 3.4,
    intG: 1.7,
};

const baseStats = {
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
    resist: 21,
};

let charlvl = 1; // Char level
let inventory = []; // Inventory

const items = {
    item1: {
        name: "Wraith Band",
        str: 2,
        agl: 5,
        int: 2,
        attackSpeed: 10,
        armor: 2.6,
        damage: 5,
        health: 44,
        healthRegen: 0.2,
        mana: 24,
        manaRegen: 0.1,
        magicResist: 0.1,
    },
    item2: {
        name: "Magic Wand",
        str: 3,
        agl: 3,
        int: 3,
        attackSpeed: 3,
        armor: 0.51,
        damage: 3,
        health: 66,
        healthRegen: 0.3,
        mana: 36,
        manaRegen: 0.15,
        magicResist: 0.3,
    },
    item3: {
        name: "Power Threads",
        agl: 10,
        moveSpeed: 55,
        attackSpeed: 35,
        armor: 1.7,
        damage: 10,
    },
    item4: {
        name: "Battle Fury",
        damage: 65,
        healthRegen: 7.5,
        manaRegen: 3.75,
    },
    item5: { name: "Desolator", damage: 50 },
    item6: { name: "Morbid Mask" },
    item7: {
        name: "Black King Bar",
        str: 10,
        damage: 24,
        health: 220,
        healthRegen: 1,
    },
    item8: {
        name: "Satanic",
        str: 25,
        damage: 25,
        health: 550,
        healthRegen: 2.5,
    },
    item9: {
        name: "Abyssal Blade",
        damage: 35,
        health: 470,
        healthRegen: 11.0,
        str: 10,
    },
};

// Function for calculating statistics
function calculateStats(level, inventory) {
    const currentAttributes = {
        str: Attributes.str + (level - 1) * AttributesGrowth.strG,
        agl: Attributes.agl + (level - 1) * AttributesGrowth.aglG,
        int: Attributes.int + (level - 1) * AttributesGrowth.intG,
    };

    // Initialize stats with base values
    const statsFromLevel = {
        health: baseStats.health + (currentAttributes.str - Attributes.str) * 22,
        healthRegen: baseStats.healthRegen + (currentAttributes.str - Attributes.str) * 0.1,
        attackSpeed: baseStats.attackSpeed + (currentAttributes.agl - Attributes.agl),
        damage: baseStats.damage + (currentAttributes.str - Attributes.str),
        armor: baseStats.armor + (currentAttributes.agl - Attributes.agl) * 0.17,
        mana: baseStats.mana + (currentAttributes.int - Attributes.int) * 12,
        manaRegen: baseStats.manaRegen + (currentAttributes.int - Attributes.int) * 0.05,
        magicResist: baseStats.magicResist + (currentAttributes.int - Attributes.int) * 0.1,
        evade: baseStats.evade + (level - 1) * 1.5,
        resist: baseStats.resist + (0.06 * baseStats.armor) / (1 + 0.06 * baseStats.armor),
    };

    // Initialize stats for items
    const statsFromItems = {
        str: 0,
        agl: 0,
        int: 0,
        health: 0,
        healthRegen: 0,
        attackSpeed: 0,
        damage: 0,
        armor: 0,
        mana: 0,
        manaRegen: 0,
        magicResist: 0,
        moveSpeed: 0,
    };

    // Calculate stats from items
    inventory.forEach((item) => {
        const itemStats = items[item];
        if (itemStats) {
            statsFromItems.str += itemStats.str || 0;
            statsFromItems.agl += itemStats.agl || 0;
            statsFromItems.int += itemStats.int || 0;
            statsFromItems.health += itemStats.health || 0;
            statsFromItems.healthRegen += itemStats.healthRegen || 0;
            statsFromItems.attackSpeed += itemStats.attackSpeed || 0;
            statsFromItems.damage += itemStats.damage || 0;
            statsFromItems.armor += itemStats.armor || 0;
            statsFromItems.mana += itemStats.mana || 0;
            statsFromItems.manaRegen += itemStats.manaRegen || 0;
            statsFromItems.magicResist += itemStats.magicResist || 0;
            statsFromItems.moveSpeed += itemStats.moveSpeed || 0;
        }
    });

    // Update attributes based on items
    currentAttributes.str += statsFromItems.str;
    currentAttributes.agl += statsFromItems.agl;
    currentAttributes.int += statsFromItems.int;

    // Sum up stats from level and stats from items
    const currentStats = {
        health: statsFromLevel.health + statsFromItems.health,
        healthRegen: statsFromLevel.healthRegen + statsFromItems.healthRegen,
        attackSpeed: statsFromLevel.attackSpeed + statsFromItems.attackSpeed,
        damage: statsFromLevel.damage + statsFromItems.damage,
        armor: statsFromLevel.armor + statsFromItems.armor,
        mana: statsFromLevel.mana + statsFromItems.mana,
        manaRegen: statsFromLevel.manaRegen + statsFromItems.manaRegen,
        magicResist: statsFromLevel.magicResist + statsFromItems.magicResist,
        evade: statsFromLevel.evade,
        resist: statsFromLevel.resist,
        moveSpeed: baseStats.moveSpeed + statsFromItems.moveSpeed,
    };

    // Update the statistics display
    updateStatsDisplay(currentStats, currentAttributes);
}

// Function to update the display of statistics
function updateStatsDisplay(currentStats, currentAttributes) {
    const healthText = document.querySelector(".bar-green .bar-text");
    if (healthText) healthText.textContent = currentStats.health.toFixed(0);
    const healthRegenText = document.querySelector(".bar-green .bar-text-hp");
    if (healthRegenText) healthRegenText.textContent = `+${currentStats.healthRegen.toFixed(1)}`;
    const attackSpeedText = document.querySelector("#AttackSpeed");
    if (attackSpeedText) attackSpeedText.textContent = `${currentStats.attackSpeed.toFixed(0)}`;
    const damageText = document.querySelector("#Damage");
    if (damageText) damageText.textContent = `${currentStats.damage.toFixed(0)}`;
    const armorText = document.querySelector("#Armor");
    if (armorText) armorText.textContent = `${currentStats.armor.toFixed(1)}`;
    const manaText = document.querySelector(".bar-blue .bar-text");
    if (manaText) manaText.textContent = currentStats.mana.toFixed(0);
    const manaRegenText = document.querySelector(".bar-blue .bar-text-mana");
    if (manaRegenText) manaRegenText.textContent = `+${currentStats.manaRegen.toFixed(1)}`;
    const magicResistText = document.querySelector("#MagicResist");
    if (magicResistText) magicResistText.textContent = `${currentStats.magicResist.toFixed(1)}%`;
    const evadeText = document.querySelector("#Evade");
    if (evadeText) evadeText.textContent = `${currentStats.evade.toFixed(1)}%`;
    const resistText = document.querySelector("#Resist");
    if (resistText) resistText.textContent = `${currentStats.resist.toFixed(0)}%`;
    const moveSpeedText = document.querySelector("#MoveSpeed");
    if (moveSpeedText) moveSpeedText.textContent = currentStats.moveSpeed.toFixed(0);
    const manaRegenText2 = document.querySelector("#ManaRegen");
    if (manaRegenText2) manaRegenText2.textContent = currentStats.manaRegen.toFixed(2);

    // Update attributes
    const strText = document.querySelector(".guiattributes li:nth-child(1) b");
    if (strText) strText.textContent = currentAttributes.str.toFixed(0);
    const aglText = document.querySelector(".guiattributes li:nth-child(2) b");
    if (aglText) aglText.textContent = currentAttributes.agl.toFixed(0);
    const intText = document.querySelector(".guiattributes li:nth-child(3) b");
    if (intText) intText.textContent = currentAttributes.int.toFixed(0);
}

// Function to add an item to inventory
function addItem(itemId) {
    if (!inventory.includes(itemId)) {
        inventory.push(itemId);
        calculateStats(charlvl, inventory);
    }
}

// Function to remove an item from inventory
function removeItem(itemId) {
    const index = inventory.indexOf(itemId);
    if (index > -1) {
        inventory.splice(index, 1);
        calculateStats(charlvl, inventory);
    }
}

// Function to update character level
function updateCharLevel(change) {
    charlvl += change;
    if (charlvl > 30) charlvl = 30;
    if (charlvl < 1) charlvl = 1;
    const lvltext = document.querySelector(".lvltext");
    if (lvltext) lvltext.textContent = charlvl;
    calculateStats(charlvl, inventory);
}

// Function to reset character level
function resetCharLevel() {
    charlvl = 1;
    const lvltext = document.querySelector(".lvltext");
    if (lvltext) lvltext.textContent = charlvl;
    inventory = [];
    calculateStats(charlvl, inventory);

    const slots = document.querySelectorAll(".invitems");
    slots.forEach((slot) => {
        slot.innerHTML = "";
    });
}

// Function for checking slots and recalculation
function checkSlotsAndRecalculate() {
    const slots = document.querySelectorAll(".invitems");
    inventory = [];

    slots.forEach((slot) => {
        if (slot.hasChildNodes()) {
            const itemImg = slot.querySelector("img");
            const itemId = itemImg.getAttribute("id");
            if (itemId && items[itemId]) {
                inventory.push(itemId);
            }
        }
    });

    calculateStats(charlvl, inventory);
}

// Function to configure drag and drop of items
function setupDragAndDrop() {
    const itemsElements = document.querySelectorAll(".statsitem");
    const slots = document.querySelectorAll(".invitems");

    itemsElements.forEach((item) => {
        item.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", item.id);
            setTimeout(() => {
                item.classList.add("hide");
            }, 0);
        });

        item.addEventListener("dragend", () => {
            item.classList.remove("hide");
        });
    });

    slots.forEach((slot) => {
        slot.addEventListener("dragover", (e) => {
            e.preventDefault();
        });

        slot.addEventListener("drop", (e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData("text/plain");
            const item = document.getElementById(itemId);

            // Check if such element exists in HTML
            if (item && items[itemId]) {
                const clonedItem = item.cloneNode(true);
                const img = clonedItem.querySelector("img");

                // Make sure the cloned element has the correct ID
                img.setAttribute("id", itemId);
                img.style.width = "80px";
                img.style.height = "70px";
                img.style.border = "0.7px solid gray";
                img.style.borderRadius = "4px";

                clonedItem.querySelector("p").remove();

                // Remove previous item from inventory if slot is not empty
                if (slot.hasChildNodes()) {
                    const existingItemImg = slot.querySelector("img");
                    if (existingItemImg) {
                        const existingItemId = existingItemImg.getAttribute("id");
                        removeItem(existingItemId);
                    }
                }

                slot.innerHTML = "";
                slot.appendChild(img);

                addItem(itemId);
            }
        });
    });
}

// Call initialization after document is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initial setup
    const lvltext = document.querySelector(".lvltext");
    if (lvltext) lvltext.textContent = charlvl;

    calculateStats(charlvl, inventory);
    checkSlotsAndRecalculate();
    setupDragAndDrop();

    // Bind event handlers to buttons
    const increaseLevelButton = document.querySelector("#increaseLevelButton");
    if (increaseLevelButton) {
        increaseLevelButton.addEventListener("click", () => updateCharLevel(1));
    }

    const decreaseLevelButton = document.querySelector("#decreaseLevelButton");
    if (decreaseLevelButton) {
        decreaseLevelButton.addEventListener("click", () => updateCharLevel(-1));
    }

    const maxLevelButton = document.querySelector("#maxLevelButton");
    if (maxLevelButton) {
        maxLevelButton.addEventListener("click", () => updateCharLevel(30));
    }

    const resetLevelButton = document.querySelector("#resetLevelButton");
    if (resetLevelButton) {
        resetLevelButton.addEventListener("click", resetCharLevel);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".statsitem");

    items.forEach((item) => {
        let timeout;

        item.addEventListener("mouseenter", () => {
            timeout = setTimeout(() => {
                const tooltip = item.querySelector(".tooltipWB");
                if (tooltip) {
                    tooltip.classList.add("show-tooltipWB");
                }
            }, 1000);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timeout);
            const tooltip = item.querySelector(".tooltipWB");
            if (tooltip) {
                tooltip.classList.remove("show-tooltipWB");
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".statsitem");

    items.forEach((item) => {
        let timeout;

        item.addEventListener("mouseenter", () => {
            timeout = setTimeout(() => {
                const tooltip = item.querySelector(".tooltipMW");
                if (tooltip) {
                    tooltip.classList.add("show-tooltipMW");
                }
            }, 1000);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timeout);
            const tooltip = item.querySelector(".tooltipMW");
            if (tooltip) {
                tooltip.classList.remove("show-tooltipMW");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".statsitem");

    items.forEach((item) => {
        let timeout;

        item.addEventListener("mouseenter", () => {
            timeout = setTimeout(() => {
                const tooltip = item.querySelector(".tooltipBF");
                if (tooltip) {
                    tooltip.classList.add("show-tooltipBF");
                }
            }, 1000);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timeout);
            const tooltip = item.querySelector(".tooltipBF");
            if (tooltip) {
                tooltip.classList.remove("show-tooltipBF");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".statsitem");

    items.forEach((item) => {
        let timeout;

        item.addEventListener("mouseenter", () => {
            timeout = setTimeout(() => {
                const tooltip = item.querySelector(".tooltipDES");
                if (tooltip) {
                    tooltip.classList.add("show-tooltipDES");
                }
            }, 1000);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timeout);
            const tooltip = item.querySelector(".tooltipDES");
            if (tooltip) {
                tooltip.classList.remove("show-tooltipDES");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".statsitem");

    items.forEach((item) => {
        let timeout;

        item.addEventListener("mouseenter", () => {
            timeout = setTimeout(() => {
                const tooltip = item.querySelector(".tooltipBKB");
                if (tooltip) {
                    tooltip.classList.add("show-tooltipBKB");
                }
            }, 1000);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timeout);
            const tooltip = item.querySelector(".tooltipBKB");
            if (tooltip) {
                tooltip.classList.remove("show-tooltipBKB");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".statsitem");

    items.forEach((item) => {
        let timeout;

        item.addEventListener("mouseenter", () => {
            timeout = setTimeout(() => {
                const tooltip = item.querySelector(".tooltipSTC");
                if (tooltip) {
                    tooltip.classList.add("show-tooltipSTC");
                }
            }, 1000);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timeout);
            const tooltip = item.querySelector(".tooltipSTC");
            if (tooltip) {
                tooltip.classList.remove("show-tooltipSTC");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".statsitem");

    items.forEach((item) => {
        let timeout;

        item.addEventListener("mouseenter", () => {
            timeout = setTimeout(() => {
                const tooltip = item.querySelector(".tooltipAB");
                if (tooltip) {
                    tooltip.classList.add("show-tooltipAB");
                }
            }, 1000);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timeout);
            const tooltip = item.querySelector(".tooltipAB");
            if (tooltip) {
                tooltip.classList.remove("show-tooltipAB");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".statsitem");

    items.forEach((item) => {
        let timeout;

        item.addEventListener("mouseenter", () => {
            timeout = setTimeout(() => {
                const tooltip = item.querySelector(".tooltipPT");
                if (tooltip) {
                    tooltip.classList.add("show-tooltipPT");
                }
            }, 1000);
        });

        item.addEventListener("mouseleave", () => {
            clearTimeout(timeout);
            const tooltip = item.querySelector(".tooltipPT");
            if (tooltip) {
                tooltip.classList.remove("show-tooltipPT");
            }
        });
    });
});
