import NavLink from "@/Components/NavLink";

interface MenuProps {
    href: string,
    label: string
}

const MenuStyle = ({href, label}: MenuProps) => {
    return (
        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <NavLink href={route(href)} active={route().current(href)}>
                {label}
            </NavLink>
        </div>
    )
}

export default function MenuNav() {
    return (
        <>
            <MenuStyle href={'dashboard'} label={'dashboard'}/>
            <MenuStyle href={'diagrams.index'} label={'รายการไดอะแกรม Diagram List'}/>
            <MenuStyle href={'spareparts.index'} label={'รายการอะไหล่ SparePart List'}/>
            <MenuStyle href={'diagrams.manual.index'} label={'รายการคู่มือไดอะแกรม'}/>
        </>
    )
}
