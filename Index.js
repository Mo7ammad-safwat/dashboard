class Invoice
{
    constructor()
    {
        this.id=5;
        this.name="ali";
        this.InvoiceData={};
        this.Items=[];
    }

    CollectData()
    {
        let divPosts=document.getElementById("DivPosts");
        divPosts.innerHTML="";
        
        // let result= $.get('https://jsonplaceholder.typicode.com/posts');
    
        // result.then(
        //     (data)=>{ 
        //         let html="";
        //         for(let i=0;i<data.length;i++)
        //         {
        //             html+="div>"+data[i].body+"</div>";
        //         }
        //         divPosts.innerHTML=html;
        //      },
        //     (error)=>{ console.log(error);
        //     }
    
        // );

        fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1
        }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))


        let invoiceNumber=document.getElementById("txtInvoiceNumber");
        let invoiceDater=document.getElementById("txtInvoiceDate");
        let delivryMan=document.getElementById("ddlMan");
        let notes=document.getElementById("txtNotes");
        this.InvoiceData=
        {
            InvoiceNumber:invoiceNumber.value,
            InvoiceDate:invoiceDater.value,
            DelivryMan:delivryMan.options[delivryMan.selectedIndex].innerText,
            Notes:notes.value,
            Items:this.Items
        }
        let jssonInvoice=JSON.stringify(this.InvoiceData);

        // let result= $.post('https://jsonplaceholder.typicode.com/todos/1',jssonInvoice);
    
        // result.then(
        //     (data)=>{ console.log(data); },
        //     (error)=>{ console.log(error);}
    
        // );
        console.log(this.InvoiceData);
    }

    AddItem()
    {
        let itemName=document.getElementById("txtItemName");
        let price=document.getElementById("txtItemPrice");
        let qty=document.getElementById("txtQty");
        var InvoiceItem=
        {
            ItemName:itemName.value,
            Price:price.value,
            Qty:qty.value
        }
        this.Items.push(InvoiceItem);
        console.log(this.Items.length);
        this.ShowData();
    }

    ShowData()
    {
        let tBody=document.getElementById("TableBody");
        tBody.innerHTML="";
        let htmlData="";
        
        this.Items.forEach(function(value,index)
        {
            htmlData+="<tr> <td>"+value.ItemName+"</td>";
            htmlData+="<td>"+value.Qty+"</td>";
            htmlData+="<td>"+value.Price+"</td>";
            htmlData+="<td> <input class='btn btn-danger deleteItem' type='button' data-ItemId='"+value.ItemName+"' value='Delete' /> </td></tr>";
        });
        tBody.innerHTML=htmlData;

        let deleteButtons= document.getElementsByClassName("deleteItem");
        let myInvoice=this;
        console.log(deleteButtons.length);
        for(let i=0;i<deleteButtons.length;i++)
        {
            console.log(deleteButtons[i].dataset.itemid);
            deleteButtons[i].addEventListener("click",function()
            {
                myInvoice.Delete(deleteButtons[i]);
            });
        }

    }

    Delete(btn)
    {
        console.log( btn.dataset.itemid);
        console.log(typeof(btn.dataset.itemid));
        console.log(this.Items.length);
        this.Items.forEach(function(value,index)
        {
            if(value===btn.dataset.itemid)
            {
                this.Items.splice(index,1);
                return;
            }
        });
        btn.parentNode.parentNode.remove();
    }
}

let myInvoice=new Invoice();
console.log( myInvoice.id);

document.getElementById("btnSave").addEventListener("click",function()
{
    myInvoice.CollectData();
});

document.getElementById("btnAddItem").addEventListener("click",function()
{
    myInvoice.AddItem();
});




