import { useEffect, useState } from "react";
import { Titlebar, Featurebar, Notification, ProfileCard, Stripe, MeetStripe } from '../Components';
import CONFIG from '../Configuration';

function Main() {
    const [data, setData] = useState([]);
    const [likeData, setLikeData] = useState([]);
    const [proposals, setProposals] = useState([]);
    const [proposed, setProposed] = useState([]);
    const [requests, setRequest] = useState([]);
    const [filters, setFilters] = useState({
        country: '',
        religion: '',
        build: '',
        occupation: '',
        city: ''
    });

    const StoredData = localStorage.getItem("user");
    const user = JSON.parse(StoredData);
    const gender = user.gender;
    const IP = CONFIG.IP || 'localhost';
    const PORT = CONFIG.PORT;

    const FetchNotifications = async () => {
        try {
            const profilesResponse = await fetch(`http://${IP}:${PORT}/users/getProfiles`);
            const profilesResult = await profilesResponse.json();
            const filteredProfiles = profilesResult.filter(profile => 
                (gender === 'male' && profile.gender === 'female') || 
                (gender === 'female' && profile.gender === 'male')
            );
            setData(filteredProfiles);

            const likesResponse = await fetch(`http://${IP}:${PORT}/likes/getLiked`);
            const likesResult = await likesResponse.json();
            const filteredLikes = likesResult.filter(like => user.email === like.saver);
            setLikeData(filteredLikes);

            const proposalsResponse = await fetch(`http://${IP}:${PORT}/proposals/getProposals`);
            const proposalsResult = await proposalsResponse.json();
            const filteredProposals = proposalsResult.filter(prp =>
                user.email === prp.proposed && prp.state === 'N'
            );
            const filteredProposed = proposalsResult.filter(prp => 
                user.email === prp.proposal
            );
            setProposals(filteredProposals);
            setProposed(filteredProposed);

            const requestsResponse = await fetch(`http://${IP}:${PORT}/rooms/getRequest?matched=${user.email}`);
            const requestsResult = await requestsResponse.json();
            const filteredRequests = requestsResult.filter(rqs =>
                user.email === rqs.chat2 && rqs.state === 'P'
            );
            setRequest(filteredRequests);
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    const handleFilterChange = (name, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));
    };

    const filteredProfiles = data.filter(profile => {
        const userProfile = profile.profile || {};
        return (
            (filters.country === '' || userProfile.country === filters.country) &&
            (filters.religion === '' || userProfile.religion === filters.religion) &&
            (filters.build === '' || userProfile.build === filters.build) &&
            (filters.occupation === '' || userProfile.occupation === filters.occupation) &&
            (filters.city === '' || userProfile.city === filters.city)
        );
    });

    const handleDismissNotification = (type, email) => {
        if (type === "proposal") {
            setProposals((prev) => prev.filter((prp) => prp.profile.email !== email));
        } else if (type === "request") {
            setRequest((prev) => prev.filter((req) => req.chat1 !== email));
        }
    };

    useEffect(() => {
        FetchNotifications();
        const interval = setInterval(() => {
            FetchNotifications();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <div className="absolute top-[22vh] right-[1vw] h-[70vh] w-[20vw] rounded-[1vw] overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[10%] left-[10%] w-[30vw] h-[30vw] bg-[#f3f3f3] rounded-full"></div>
                </div>
                <div className="relative z-10 p-[1vw]">
                    {proposals.length > 0 ? (
                        proposals.map((prps, index) => (
                            <Notification
                                key={index}
                                username={prps.profile.username}
                                email={prps.profile.email}
                                type="proposal"
                                onDismiss={handleDismissNotification}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400 text-[1.2vw]">No Proposal Notifications</p>
                    )}
                    {requests.length > 0 ? (
                        requests.map((rqs, index) => (
                            <Notification
                                key={index}
                                username={rqs.username}
                                email={rqs.chat1}
                                type="request"
                                onDismiss={handleDismissNotification}
                            />
                        ))
                    ) : (
                        <p className="text-gray-400 text-[1.2vw]">No Request Notifications</p>
                    )}
                </div>
            </div>
            <Titlebar />
            <Featurebar onFilterChange={handleFilterChange} />
            <div className="flex flex-row w-[90vw]">
                <div className="flex flex-col h-[79vh] border border-gray-300 w-[20vw]">
                    <div className="overflow-y-auto custom-scrollbar">
                        {likeData.length > 0 ? (
                            likeData.map((likeCard, index) => (
                                <Stripe key={index}
                                    username={likeCard.user.username}
                                    profile_image={likeCard.profile.profile_image}
                                    email={likeCard.email}
                                />
                            ))
                        ) : (
                            <p className='text-gray-500 text-[1.2vw] m-[1vw]'>No Liked Profile</p>
                        )}
                        {proposed.length > 0 ? (
                            proposed.map((prpd, index) => (
                                <MeetStripe
                                    username={prpd.proposedProfile.username}
                                    status={prpd.state}
                                    email={prpd.proposed}
                                />
                            ))
                        ) : (
                            <p className='text-gray-500 text-[1.2vw] m-[1vw]'>No Proposals Sent</p>
                        )}
                    </div>
                </div>
                <div className="overflow-y-auto custom-scrollbar h-[80vh] p-[1.2vh]">
                    {filteredProfiles.length > 0 ? (
                        filteredProfiles.map((card, index) => (
                            <ProfileCard key={index}
                                email={card.email}
                                username={card.username}
                                country={card.profile.country}
                                city={card.profile.city}
                                occupation={card.profile.occupation}
                                education={card.profile.education}
                                religion={card.profile.religion}
                                maritalStatus={card.profile.maritalStatus}
                                children={card.profile.children}
                                smoking={card.profile.smoking}
                                drinking={card.profile.drinking}
                                build={card.profile.build}
                                description={card.profile.description}
                                profile_image={card.profile.profile_image}
                                state={card.profile.state}
                            />
                        ))
                    ) : (
                        <p>No profiles available</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Main;
