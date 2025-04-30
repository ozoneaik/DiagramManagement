interface DiagramManualProps {
    current_page: number,
    data: DmmListProps[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    link: any,
    next_page_url: any,
    path: string,
    per_page: number,
    prev_page_url: any,
    to: number,
    total: number
}

interface DmmListProps {
    sku_code: string,
    model_fg: string,
    type_dm: string,
    path_file: string,
    created_at? : string,
    updated_at? : string
}
