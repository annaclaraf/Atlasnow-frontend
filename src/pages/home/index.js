import { useEffect, useState } from 'react'
import { Sidebar } from '../../components/Sidebar/index'

import { api } from '../../services/api'

import './style.css'

export function Home() {
    const token = localStorage.getItem('token');
    const [funcionario, setFuncionario] = useState([]);
    const [emissor, setEmissor] = useState([]);


    useEffect(() => {
        async function loadFunc() {
            const response = await api.get('/funcionarios', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setFuncionario(response.data)
        }

        async function loadEmi() {
            const response = await api.get('/emissores', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setEmissor(response.data)
        }

        loadFunc()
        loadEmi()
    }, []);

    return (
        <main>
            <Sidebar />

            <section>
                <svg
                    width="202"
                    height="64"
                    viewBox="0 0 202 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M114.993 29.9091L110.164 59H103.573L95.6183 43.7159H95.4479L92.8911 59H84.9933L89.8229 29.9091H96.5274L104.368 45.1364H104.596L107.096 29.9091H114.993ZM144.411 44.9659C143.881 48.1288 142.83 50.7803 141.258 52.9205C139.686 55.0606 137.777 56.6752 135.533 57.7642C133.289 58.8532 130.888 59.3977 128.331 59.3977C125.604 59.3977 123.237 58.8059 121.229 57.6222C119.222 56.4384 117.758 54.7055 116.84 52.4233C115.921 50.1411 115.737 47.3523 116.286 44.0568C116.797 40.8939 117.839 38.233 119.411 36.0739C120.983 33.9148 122.901 32.2812 125.164 31.1733C127.427 30.0653 129.847 29.5114 132.422 29.5114C135.131 29.5114 137.484 30.108 139.482 31.3011C141.49 32.4943 142.948 34.2415 143.857 36.5426C144.776 38.8437 144.96 41.6515 144.411 44.9659ZM136.456 44.0568C136.722 42.3902 136.74 40.9886 136.513 39.8523C136.286 38.7064 135.808 37.8447 135.079 37.267C134.349 36.6799 133.369 36.3864 132.138 36.3864C130.737 36.3864 129.496 36.7273 128.417 37.4091C127.337 38.0909 126.442 39.071 125.732 40.3494C125.022 41.6278 124.525 43.1667 124.24 44.9659C123.937 46.6515 123.909 48.053 124.155 49.1705C124.411 50.2879 124.913 51.1259 125.661 51.6847C126.419 52.2434 127.403 52.5227 128.615 52.5227C129.998 52.5227 131.22 52.1913 132.28 51.5284C133.35 50.8655 134.236 49.9044 134.937 48.6449C135.647 47.3854 136.153 45.8561 136.456 44.0568ZM151.286 59L147.536 29.9091H156.343L157.365 47.8068H157.593L165.263 29.9091H172.195L173.956 47.8636H174.184L181.115 29.9091H189.922L176.513 59H168.956L166.74 42.75H166.513L158.843 59H151.286Z"
                        fill="white"
                    />
                    <path
                        d="M114.993 29.9091L115.98 30.0729L116.173 28.9091H114.993V29.9091ZM110.164 59V60H111.011L111.15 59.1638L110.164 59ZM103.573 59L102.686 59.4617L102.966 60H103.573V59ZM95.6183 43.7159L96.5054 43.2542L96.2252 42.7159H95.6183V43.7159ZM95.4479 43.7159V42.7159H94.6013L94.4616 43.5509L95.4479 43.7159ZM92.8911 59V60H93.7377L93.8774 59.165L92.8911 59ZM84.9933 59L84.0068 58.8362L83.8136 60H84.9933V59ZM89.8229 29.9091V28.9091H88.9752L88.8364 29.7453L89.8229 29.9091ZM96.5274 29.9091L97.4165 29.4513L97.1373 28.9091H96.5274V29.9091ZM104.368 45.1364L103.479 45.5942L103.758 46.1364H104.368V45.1364ZM104.596 45.1364V46.1364H105.445L105.582 45.2984L104.596 45.1364ZM107.096 29.9091V28.9091H106.246L106.109 29.7471L107.096 29.9091ZM114.007 29.7453L109.177 58.8362L111.15 59.1638L115.98 30.0729L114.007 29.7453ZM110.164 58H103.573V60H110.164V58ZM104.46 58.5383L96.5054 43.2542L94.7313 44.1776L102.686 59.4617L104.46 58.5383ZM95.6183 42.7159H95.4479V44.7159H95.6183V42.7159ZM94.4616 43.5509L91.9048 58.835L93.8774 59.165L96.4342 43.8809L94.4616 43.5509ZM92.8911 58H84.9933V60H92.8911V58ZM85.9798 59.1638L90.8094 30.0729L88.8364 29.7453L84.0068 58.8362L85.9798 59.1638ZM89.8229 30.9091H96.5274V28.9091H89.8229V30.9091ZM95.6384 30.3669L103.479 45.5942L105.257 44.6786L97.4165 29.4513L95.6384 30.3669ZM104.368 46.1364H104.596V44.1364H104.368V46.1364ZM105.582 45.2984L108.082 30.0711L106.109 29.7471L103.609 44.9744L105.582 45.2984ZM107.096 30.9091H114.993V28.9091H107.096V30.9091ZM144.411 44.9659L145.397 45.1313L145.397 45.1294L144.411 44.9659ZM141.258 52.9205L140.452 52.3285L140.452 52.3285L141.258 52.9205ZM135.533 57.7642L135.97 58.6639L135.97 58.6639L135.533 57.7642ZM121.229 57.6222L121.737 56.7607L121.229 57.6222ZM116.84 52.4233L117.768 52.0499L117.768 52.0499L116.84 52.4233ZM116.286 44.0568L117.272 44.2212L117.273 44.2164L116.286 44.0568ZM119.411 36.0739L118.603 35.4853L118.603 35.4853L119.411 36.0739ZM125.164 31.1733L124.724 30.2751L124.724 30.2751L125.164 31.1733ZM139.482 31.3011L138.969 32.1597L138.971 32.1608L139.482 31.3011ZM143.857 36.5426L142.927 36.91L142.928 36.9133L143.857 36.5426ZM136.456 44.0568L137.443 44.2229L137.444 44.2139L136.456 44.0568ZM136.513 39.8523L135.532 40.0468L135.533 40.0484L136.513 39.8523ZM135.079 37.267L134.451 38.046L134.458 38.0509L135.079 37.267ZM128.417 37.4091L127.883 36.5636L127.883 36.5636L128.417 37.4091ZM124.24 44.9659L125.225 45.1428L125.227 45.1324L125.228 45.1219L124.24 44.9659ZM124.155 49.1705L123.179 49.3856L123.18 49.3935L124.155 49.1705ZM125.661 51.6847L125.063 52.4859L125.067 52.4895L125.661 51.6847ZM132.28 51.5284L131.754 50.6783L131.75 50.6804L132.28 51.5284ZM134.937 48.6449L134.065 48.1537L134.063 48.1587L134.937 48.6449ZM143.425 44.8006C142.915 47.8408 141.914 50.338 140.452 52.3285L142.063 53.5124C143.745 51.2226 144.846 48.4168 145.397 45.1313L143.425 44.8006ZM140.452 52.3285C138.97 54.3462 137.185 55.8511 135.097 56.8645L135.97 58.6639C138.37 57.4993 140.402 55.775 142.063 53.5124L140.452 52.3285ZM135.097 56.8645C132.992 57.8858 130.741 58.3977 128.331 58.3977V60.3977C131.036 60.3977 133.586 59.8206 135.97 58.6639L135.097 56.8645ZM128.331 58.3977C125.752 58.3977 123.566 57.8393 121.737 56.7607L120.721 58.4836C122.907 59.7724 125.456 60.3977 128.331 60.3977V58.3977ZM121.737 56.7607C119.93 55.6955 118.609 54.1398 117.768 52.0499L115.912 52.7967C116.908 55.2712 118.513 57.1814 120.721 58.4836L121.737 56.7607ZM117.768 52.0499C116.938 49.9888 116.743 47.3981 117.272 44.2212L115.3 43.8924C114.731 47.3065 114.905 50.2934 115.912 52.7967L117.768 52.0499ZM117.273 44.2164C117.764 41.1779 118.757 38.6716 120.219 36.6625L118.603 35.4853C116.921 37.7943 115.83 40.61 115.299 43.8972L117.273 44.2164ZM120.219 36.6625C121.701 34.6269 123.495 33.1035 125.603 32.0714L124.724 30.2751C122.306 31.459 120.264 33.2026 118.603 35.4853L120.219 36.6625ZM125.603 32.0714C127.727 31.032 129.995 30.5114 132.422 30.5114V28.5114C129.698 28.5114 127.127 29.0987 124.724 30.2751L125.603 32.0714ZM132.422 30.5114C134.98 30.5114 137.15 31.0733 138.969 32.1597L139.995 30.4426C137.818 29.1426 135.281 28.5114 132.422 28.5114V30.5114ZM138.971 32.1608C140.777 33.2338 142.094 34.8017 142.927 36.91L144.787 36.1752C143.802 33.6812 142.203 31.7548 139.993 30.4415L138.971 32.1608ZM142.928 36.9133C143.759 38.995 143.954 41.6062 143.424 44.8024L145.397 45.1294C145.966 41.6968 145.792 38.6925 144.786 36.1719L142.928 36.9133ZM137.444 44.2139C137.72 42.4788 137.752 40.9491 137.494 39.6562L135.533 40.0484C135.729 41.0282 135.723 42.3015 135.469 43.8997L137.444 44.2139ZM137.494 39.6577C137.233 38.3403 136.659 37.243 135.7 36.4832L134.458 38.0509C134.957 38.4464 135.339 39.0726 135.532 40.0468L137.494 39.6577ZM135.706 36.4882C134.75 35.7183 133.525 35.3864 132.138 35.3864V37.3864C133.213 37.3864 133.949 37.6415 134.451 38.0459L135.706 36.4882ZM132.138 35.3864C130.567 35.3864 129.137 35.7711 127.883 36.5636L128.951 38.2546C129.855 37.6834 130.907 37.3864 132.138 37.3864V35.3864ZM127.883 36.5636C126.642 37.3472 125.638 38.4603 124.858 39.8638L126.606 40.8351C127.247 39.6817 128.032 38.8346 128.951 38.2546L127.883 36.5636ZM124.858 39.8638C124.079 41.2662 123.551 42.9223 123.253 44.8099L125.228 45.1219C125.498 43.411 125.965 41.9894 126.606 40.8351L124.858 39.8638ZM123.256 44.789C122.94 46.546 122.894 48.0917 123.179 49.3856L125.132 48.9553C124.925 48.0143 124.935 46.757 125.225 45.1428L123.256 44.789ZM123.18 49.3935C123.477 50.6876 124.084 51.7549 125.063 52.4859L126.259 50.8834C125.742 50.497 125.345 49.8882 125.13 48.9474L123.18 49.3935ZM125.067 52.4895C126.041 53.2072 127.251 53.5227 128.615 53.5227V51.5227C127.555 51.5227 126.796 51.2795 126.254 50.8799L125.067 52.4895ZM128.615 53.5227C130.165 53.5227 131.574 53.1489 132.81 52.3764L131.75 50.6804C130.865 51.2337 129.831 51.5227 128.615 51.5227V53.5227ZM132.807 52.3785C134.042 51.6136 135.039 50.5176 135.81 49.1311L134.063 48.1587C133.433 49.2911 132.659 50.1175 131.754 50.6783L132.807 52.3785ZM135.808 49.1361C136.587 47.7532 137.125 46.1077 137.443 44.2229L135.47 43.8907C135.182 45.6044 134.706 47.0176 134.065 48.1537L135.808 49.1361ZM151.286 59L150.294 59.1278L150.407 60H151.286V59ZM147.536 29.9091V28.9091H146.399L146.544 30.0369L147.536 29.9091ZM156.343 29.9091L157.341 29.852L157.287 28.9091H156.343V29.9091ZM157.365 47.8068L156.367 47.8639L156.421 48.8068H157.365V47.8068ZM157.593 47.8068V48.8068H158.252L158.512 48.2007L157.593 47.8068ZM165.263 29.9091V28.9091H164.604L164.344 29.5152L165.263 29.9091ZM172.195 29.9091L173.19 29.8115L173.102 28.9091H172.195V29.9091ZM173.956 47.8636L172.961 47.9613L173.05 48.8636H173.956V47.8636ZM174.184 47.8636V48.8636H174.87L175.117 48.2238L174.184 47.8636ZM181.115 29.9091V28.9091H180.43L180.183 29.5489L181.115 29.9091ZM189.922 29.9091L190.83 30.3277L191.484 28.9091H189.922V29.9091ZM176.513 59V60H177.153L177.421 59.4186L176.513 59ZM168.956 59L167.966 59.1351L168.084 60H168.956V59ZM166.74 42.75L167.731 42.6149L167.613 41.75H166.74V42.75ZM166.513 42.75V41.75H165.879L165.609 42.3231L166.513 42.75ZM158.843 59V60H159.477L159.747 59.4269L158.843 59ZM152.278 58.8722L148.528 29.7812L146.544 30.0369L150.294 59.1278L152.278 58.8722ZM147.536 30.9091H156.343V28.9091H147.536V30.9091ZM155.344 29.9661L156.367 47.8639L158.364 47.7498L157.341 29.852L155.344 29.9661ZM157.365 48.8068H157.593V46.8068H157.365V48.8068ZM158.512 48.2007L166.182 30.303L164.344 29.5152L156.674 47.4129L158.512 48.2007ZM165.263 30.9091H172.195V28.9091H165.263V30.9091ZM171.2 30.0067L172.961 47.9613L174.952 47.766L173.19 29.8115L171.2 30.0067ZM173.956 48.8636H174.184V46.8636H173.956V48.8636ZM175.117 48.2238L182.048 30.2693L180.183 29.5489L173.251 47.5035L175.117 48.2238ZM181.115 30.9091H189.922V28.9091H181.115V30.9091ZM189.014 29.4905L175.605 58.5814L177.421 59.4186L190.83 30.3277L189.014 29.4905ZM176.513 58H168.956V60H176.513V58ZM169.947 58.8649L167.731 42.6149L165.75 42.8851L167.966 59.1351L169.947 58.8649ZM166.74 41.75H166.513V43.75H166.74V41.75ZM165.609 42.3231L157.938 58.5731L159.747 59.4269L167.418 43.1769L165.609 42.3231ZM158.843 58H151.286V60H158.843V58Z"
                        fill="black"
                    />
                    <path
                        d="M15.84 40L15 35.56H8.68L7.84 40H2.4L7.8 12H16.08L21.2 40H15.84ZM11.76 17.2L10.2 26.52L9.32 31.28H14.32L13.4 26.52L11.84 17.2H11.76ZM25.6275 16.8H19.5875V12H37.1075V16.8H31.0675V40H25.6275V16.8ZM39.4278 40V12H44.9078V35.36H53.2278V40H39.4278ZM67.8713 40L67.0313 35.56H60.7113L59.8713 40H54.4313L59.8313 12H68.1113L73.2313 40H67.8713ZM63.7913 17.2L62.2313 26.52L61.3513 31.28H66.3513L65.4313 26.52L63.8713 17.2H63.7913ZM78.1206 12H87.7206V16.8H80.0406L79.9206 17.04L86.3206 28.72C87.6273 31.0667 88.2806 32.8533 88.2806 34.08C88.2806 36.7733 87.3873 38.7467 85.6006 40H75.0006V35.36H83.2806L83.4006 35.12L76.2006 22.2C75.1606 20.3333 74.6406 18.8133 74.6406 17.64C74.6406 14.8667 75.8006 12.9867 78.1206 12Z"
                        fill="white"
                    />
                    <path
                        d="M15.84 40L15 35.56H8.68L7.84 40H2.4L7.8 12H16.08L21.2 40H15.84ZM11.76 17.2L10.2 26.52L9.32 31.28H14.32L13.4 26.52L11.84 17.2H11.76ZM25.6275 16.8H19.5875V12H37.1075V16.8H31.0675V40H25.6275V16.8ZM39.4278 40V12H44.9078V35.36H53.2278V40H39.4278ZM67.8713 40L67.0313 35.56H60.7113L59.8713 40H54.4313L59.8313 12H68.1113L73.2313 40H67.8713ZM63.7913 17.2L62.2313 26.52L61.3513 31.28H66.3513L65.4313 26.52L63.8713 17.2H63.7913ZM78.1206 12H87.7206V16.8H80.0406L79.9206 17.04L86.3206 28.72C87.6273 31.0667 88.2806 32.8533 88.2806 34.08C88.2806 36.7733 87.3873 38.7467 85.6006 40H75.0006V35.36H83.2806L83.4006 35.12L76.2006 22.2C75.1606 20.3333 74.6406 18.8133 74.6406 17.64C74.6406 14.8667 75.8006 12.9867 78.1206 12Z"
                        fill="black"
                    />
                    <path
                        d="M15.84 40L14.8574 40.1859L15.0115 41H15.84V40ZM15 35.56L15.9826 35.3741L15.8286 34.56H15V35.56ZM8.68 35.56V34.56H7.85145L7.69743 35.3741L8.68 35.56ZM7.84 40V41H8.66855L8.82257 40.1859L7.84 40ZM2.4 40L1.41809 39.8106L1.18872 41H2.4V40ZM7.8 12V11H6.97443L6.81809 11.8106L7.8 12ZM16.08 12L17.0637 11.8201L16.9137 11H16.08V12ZM21.2 40V41H22.3994L22.1837 39.8201L21.2 40ZM11.76 17.2V16.2H10.9135L10.7737 17.0349L11.76 17.2ZM10.2 26.52L11.1833 26.7018L11.1849 26.6935L11.1863 26.6851L10.2 26.52ZM9.32 31.28L8.33666 31.0982L8.11818 32.28H9.32V31.28ZM14.32 31.28V32.28H15.5318L15.3018 31.0902L14.32 31.28ZM13.4 26.52L12.4137 26.6851L12.4158 26.6975L12.4182 26.7098L13.4 26.52ZM11.84 17.2L12.8263 17.0349L12.6865 16.2H11.84V17.2ZM16.8226 39.8141L15.9826 35.3741L14.0174 35.7459L14.8574 40.1859L16.8226 39.8141ZM15 34.56H8.68V36.56H15V34.56ZM7.69743 35.3741L6.85743 39.8141L8.82257 40.1859L9.66257 35.7459L7.69743 35.3741ZM7.84 39H2.4V41H7.84V39ZM3.38191 40.1894L8.78191 12.1894L6.81809 11.8106L1.41809 39.8106L3.38191 40.1894ZM7.8 13H16.08V11H7.8V13ZM15.0963 12.1799L20.2163 40.1799L22.1837 39.8201L17.0637 11.8201L15.0963 12.1799ZM21.2 39H15.84V41H21.2V39ZM10.7737 17.0349L9.21372 26.3549L11.1863 26.6851L12.7463 17.3651L10.7737 17.0349ZM9.21666 26.3382L8.33666 31.0982L10.3033 31.4618L11.1833 26.7018L9.21666 26.3382ZM9.32 32.28H14.32V30.28H9.32V32.28ZM15.3018 31.0902L14.3818 26.3302L12.4182 26.7098L13.3382 31.4698L15.3018 31.0902ZM14.3863 26.3549L12.8263 17.0349L10.8537 17.3651L12.4137 26.6851L14.3863 26.3549ZM11.84 16.2H11.76V18.2H11.84V16.2ZM25.6275 16.8H26.6275V15.8H25.6275V16.8ZM19.5875 16.8H18.5875V17.8H19.5875V16.8ZM19.5875 12V11H18.5875V12H19.5875ZM37.1075 12H38.1075V11H37.1075V12ZM37.1075 16.8V17.8H38.1075V16.8H37.1075ZM31.0675 16.8V15.8H30.0675V16.8H31.0675ZM31.0675 40V41H32.0675V40H31.0675ZM25.6275 40H24.6275V41H25.6275V40ZM25.6275 15.8H19.5875V17.8H25.6275V15.8ZM20.5875 16.8V12H18.5875V16.8H20.5875ZM19.5875 13H37.1075V11H19.5875V13ZM36.1075 12V16.8H38.1075V12H36.1075ZM37.1075 15.8H31.0675V17.8H37.1075V15.8ZM30.0675 16.8V40H32.0675V16.8H30.0675ZM31.0675 39H25.6275V41H31.0675V39ZM26.6275 40V16.8H24.6275V40H26.6275ZM39.4278 40H38.4278V41H39.4278V40ZM39.4278 12V11H38.4278V12H39.4278ZM44.9078 12H45.9078V11H44.9078V12ZM44.9078 35.36H43.9078V36.36H44.9078V35.36ZM53.2278 35.36H54.2278V34.36H53.2278V35.36ZM53.2278 40V41H54.2278V40H53.2278ZM40.4278 40V12H38.4278V40H40.4278ZM39.4278 13H44.9078V11H39.4278V13ZM43.9078 12V35.36H45.9078V12H43.9078ZM44.9078 36.36H53.2278V34.36H44.9078V36.36ZM52.2278 35.36V40H54.2278V35.36H52.2278ZM53.2278 39H39.4278V41H53.2278V39ZM67.8713 40L66.8887 40.1859L67.0427 41H67.8713V40ZM67.0313 35.56L68.0138 35.3741L67.8598 34.56H67.0313V35.56ZM60.7113 35.56V34.56H59.8827L59.7287 35.3741L60.7113 35.56ZM59.8713 40V41H60.6998L60.8538 40.1859L59.8713 40ZM54.4313 40L53.4493 39.8106L53.22 41H54.4313V40ZM59.8313 12V11H59.0057L58.8493 11.8106L59.8313 12ZM68.1113 12L69.0949 11.8201L68.945 11H68.1113V12ZM73.2313 40V41H74.4307L74.2149 39.8201L73.2313 40ZM63.7913 17.2V16.2H62.9447L62.805 17.0349L63.7913 17.2ZM62.2313 26.52L63.2146 26.7018L63.2161 26.6935L63.2175 26.6851L62.2313 26.52ZM61.3513 31.28L60.3679 31.0982L60.1494 32.28H61.3513V31.28ZM66.3513 31.28V32.28H67.563L67.3331 31.0902L66.3513 31.28ZM65.4313 26.52L64.445 26.6851L64.447 26.6975L64.4494 26.7098L65.4313 26.52ZM63.8713 17.2L64.8575 17.0349L64.7178 16.2H63.8713V17.2ZM68.8538 39.8141L68.0138 35.3741L66.0487 35.7459L66.8887 40.1859L68.8538 39.8141ZM67.0313 34.56H60.7113V36.56H67.0313V34.56ZM59.7287 35.3741L58.8887 39.8141L60.8538 40.1859L61.6938 35.7459L59.7287 35.3741ZM59.8713 39H54.4313V41H59.8713V39ZM55.4132 40.1894L60.8132 12.1894L58.8493 11.8106L53.4493 39.8106L55.4132 40.1894ZM59.8313 13H68.1113V11H59.8313V13ZM67.1276 12.1799L72.2476 40.1799L74.2149 39.8201L69.0949 11.8201L67.1276 12.1799ZM73.2313 39H67.8713V41H73.2313V39ZM62.805 17.0349L61.245 26.3549L63.2175 26.6851L64.7775 17.3651L62.805 17.0349ZM61.2479 26.3382L60.3679 31.0982L62.3346 31.4618L63.2146 26.7018L61.2479 26.3382ZM61.3513 32.28H66.3513V30.28H61.3513V32.28ZM67.3331 31.0902L66.4131 26.3302L64.4494 26.7098L65.3694 31.4698L67.3331 31.0902ZM66.4175 26.3549L64.8575 17.0349L62.885 17.3651L64.445 26.6851L66.4175 26.3549ZM63.8713 16.2H63.7913V18.2H63.8713V16.2ZM78.1206 12V11H77.9168L77.7293 11.0798L78.1206 12ZM87.7206 12H88.7206V11H87.7206V12ZM87.7206 16.8V17.8H88.7206V16.8H87.7206ZM80.0406 16.8V15.8H79.4226L79.1462 16.3528L80.0406 16.8ZM79.9206 17.04L79.0262 16.5928L78.792 17.0612L79.0436 17.5205L79.9206 17.04ZM86.3206 28.72L85.4436 29.2005L85.4469 29.2065L86.3206 28.72ZM85.6006 40V41H85.9164L86.1749 40.8187L85.6006 40ZM75.0006 40H74.0006V41H75.0006V40ZM75.0006 35.36V34.36H74.0006V35.36H75.0006ZM83.2806 35.36V36.36H83.8987L84.1751 35.8072L83.2806 35.36ZM83.4006 35.12L84.2951 35.5672L84.5313 35.0947L84.2741 34.6332L83.4006 35.12ZM76.2006 22.2L75.3271 22.6867L75.3271 22.6868L76.2006 22.2ZM78.1206 13H87.7206V11H78.1206V13ZM86.7206 12V16.8H88.7206V12H86.7206ZM87.7206 15.8H80.0406V17.8H87.7206V15.8ZM79.1462 16.3528L79.0262 16.5928L80.8151 17.4872L80.9351 17.2472L79.1462 16.3528ZM79.0436 17.5205L85.4436 29.2005L87.1976 28.2395L80.7976 16.5595L79.0436 17.5205ZM85.4469 29.2065C86.7474 31.542 87.2806 33.1317 87.2806 34.08H89.2806C89.2806 32.575 88.5072 30.5914 87.1943 28.2335L85.4469 29.2065ZM87.2806 34.08C87.2806 36.5334 86.4827 38.1597 85.0263 39.1813L86.1749 40.8187C88.2919 39.3336 89.2806 37.0132 89.2806 34.08H87.2806ZM85.6006 39H75.0006V41H85.6006V39ZM76.0006 40V35.36H74.0006V40H76.0006ZM75.0006 36.36H83.2806V34.36H75.0006V36.36ZM84.1751 35.8072L84.2951 35.5672L82.5062 34.6728L82.3862 34.9128L84.1751 35.8072ZM84.2741 34.6332L77.0741 21.7132L75.3271 22.6868L82.5271 35.6068L84.2741 34.6332ZM77.0742 21.7133C76.0592 19.8915 75.6406 18.5542 75.6406 17.64H73.6406C73.6406 19.0725 74.262 20.7751 75.3271 22.6867L77.0742 21.7133ZM75.6406 17.64C75.6406 16.3918 75.9011 15.4215 76.3617 14.6751C76.8181 13.9354 77.5145 13.3445 78.512 12.9202L77.7293 11.0798C76.4067 11.6422 75.3631 12.4846 74.6596 13.6249C73.9602 14.7585 73.6406 16.1149 73.6406 17.64H75.6406Z"
                        fill="white"
                    />
                </svg>

                <div className="dashboard">
                    <div className="card-box">
                        {funcionario.length} <br/> Funcionários <br/> Cadastrados
                    </div>

                    <div className="card-box">
                        {emissor.length} <br/> Emissores <br/> Cadastrados
                    </div>
                </div>
            </section>
        </main>
    );
}
