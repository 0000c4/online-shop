const ItemList = ({ active, stylesActive, stylesNormal ,children, ...props }) => {

    return (
        active ?
            <div
                className={stylesActive}
                {...props}
            >{children}</div>
            :
            <div
                className={stylesNormal}
                {...props}
            >{children}</div>
    )
}

export default ItemList