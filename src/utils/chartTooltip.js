export const buildTooltip = (title, rows) => `
    <div class="custom-tooltip">
        <div class="tooltip-header">${title}</div>
        <div class="tooltip-body">
            ${rows.map(r => `
                <div class="tooltip-row">
                <span class="dot" style="background:${r.color}"></span>
                <span class="label">${r.label}:</span>
                <span class="value">${r.value}</span>
                </div>`).join('')
            }
        </div>
    </div>
`