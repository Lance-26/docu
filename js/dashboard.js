function renderDashboard(){

    const date =
        document.getElementById('dashDate');

    if(date){
        date.textContent =
            new Date().toLocaleDateString(undefined,{
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
    }

    const today = todayStr();

    const todaysTx =
        DATA.transactions.filter(function(transaction){
            return transaction.dateISO.slice(0,10) === today &&
                transaction.status === 'completed';
        });

    const todaysRevenue =
        todaysTx.reduce(function(sum, transaction){
            return sum + transaction.total;
        }, 0);

    const lowStock =
        DATA.products.filter(function(product){
            return product.stock <= product.threshold;
        });

    const statRow =
        document.getElementById('statRow');

    statRow.innerHTML = `
        <div class="stat-card">
            <div class="label">Today's sales</div>
            <div class="value">${fmt(todaysRevenue)}</div>
            <div class="sub">${todaysTx.length} orders</div>
        </div>

        <div class="stat-card">
            <div class="label">Transactions today</div>
            <div class="value">${todaysTx.length}</div>
            <div class="sub">${DATA.transactions.length} all-time</div>
        </div>

        <div class="stat-card">
            <div class="label">Products tracked</div>
            <div class="value">${DATA.products.length}</div>
            <div class="sub">
                ${DATA.products.filter(function(product){
                    return product.category === 'food';
                }).length}
                food ·
                ${DATA.products.filter(function(product){
                    return product.category === 'game';
                }).length}
                games
            </div>
        </div>

        <div class="stat-card ${lowStock.length ? 'alert' : ''}">
            <div class="label">Restock alerts</div>
            <div class="value">${lowStock.length}</div>
            <div class="sub">
                ${lowStock.length ? 'needs attention' : 'all stocked'}
            </div>
        </div>
    `;

    const recent =
        [...DATA.transactions]
        .sort(function(a,b){
            return new Date(b.dateISO) -
                new Date(a.dateISO);
        })
        .slice(0,5);

    const recentTable =
        document.getElementById('dashRecentTx');

    recentTable.innerHTML =
        recent.length
        ? recent.map(function(transaction){
            return `
                <tr>
                    <td>${transaction.receiptNo}</td>
                    <td>${niceDateTime(transaction.dateISO)}</td>
                    <td>
                        ${transaction.items.reduce(function(sum,item){
                            return sum + item.qty;
                        },0)}
                        item(s)
                    </td>
                    <td>${fmt(transaction.total)}</td>
                    <td>
                        <span class="tag ${transaction.status}">
                            ${transaction.status}
                        </span>
                    </td>
                </tr>
            `;
        }).join('')
        : `
            <tr class="empty-row">
                <td colspan="5">
                    No transactions yet.
                </td>
            </tr>
        `;

    const lowStockTable =
        document.getElementById('dashLowStock');

    lowStockTable.innerHTML =
        lowStock.length
        ? lowStock.map(function(product){
            return `
                <tr class="low-stock">
                    <td>${product.name}</td>
                    <td>${product.stock} left</td>
                </tr>
            `;
        }).join('')
        : `
            <tr class="empty-row">
                <td colspan="2">
                    Nothing needs restocking.
                </td>
            </tr>
        `;
}
