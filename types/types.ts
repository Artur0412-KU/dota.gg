type FilterProps = {
    selectedRole: string | null;
    selectedPrimaryAttr: string | null;
    onRoleChange: React.Dispatch<React.SetStateAction<string | null>>;
    onAttrChange: React.Dispatch<React.SetStateAction<string | null>>;
    isChecked: boolean;
    setIsChecked: (value: boolean) => void;
};

type Hero = {
    id: number,
    localized_name: string,
    attack_type: string,
    img: string,
    icon: string,
    primary_attr: string,
    move_speed: number,
    roles: string[],
    base_health?: number,
    base_mana?: number,
    base_attack_min?: number,
    base_attack_max?: number
}

type ModalProps = {
    modalVisible: boolean,
    selectedHero: Hero | null,
    handleModalClose: () => void
}

export {FilterProps, Hero, ModalProps}
  