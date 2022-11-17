$(".increase-qty, .reduce-qty").on("click", function () {
  const qtyNode = this.parentNode.childNodes[2];
  let qty = Number(qtyNode.value);
  qty = this.classList.contains("increase-qty")
    ? qty + 1
    : qty == 0
    ? qty
    : qty - 1;
  qtyNode.value = qty;
});
var cart =
  JSON.parse(sessionStorage.getItem("cart")) == null
    ? {}
    : JSON.parse(sessionStorage.getItem("cart"));

$("input.qty").on("keydown", function (e) {
  if (e.key == "-") {
    return false;
  }
});
$(".addtocart").on("click", function () {
  const priceString = this.parentNode.childNodes[5].childNodes[1].textContent;
  const unitPrice = parseFloat(
    priceString.replace("₦", "").replace(/,/g, "")
  ).toFixed(2);
  let quantity = parseInt(
    this.parentNode.childNodes[5].childNodes[3].childNodes[2].value
  );
  let totalCost = quantity * unitPrice;
  let productName = this.parentNode.childNodes[3].textContent;
  if (quantity > 0) {
    cart[productName] = {
      cost: totalCost,
      price: priceString,
      productQty: quantity,
    };
    alert(
      `\nYou have added ${productName} to your cart\n\nQuantity: ${quantity}\n`
    );
  }
  sessionStorage.setItem("cart", JSON.stringify(cart));
});
$(".cart").on("mouseover", function(){
  $("tbody").html("");
  var totalPrice = 0;
  let cart =
    JSON.parse(sessionStorage.getItem("cart")) == null
      ? {}
      : JSON.parse(sessionStorage.getItem("cart"));
  for (const key in cart) {
    let cost =
      "₦" +
      cart[key]["cost"].toLocaleString("en-US", { minimumFractionDigits: 2 });
    $("tbody").append(
      `<tr><td>${key}</td><td class="qty-col">${cart[key]["productQty"]}</td><td class="cost">${cost}</td></tr>`
    );
    totalPrice += cart[key]["cost"];
  }
  $("tfoot .total-cost").text(
    "₦" +
      totalPrice.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
  );
});
