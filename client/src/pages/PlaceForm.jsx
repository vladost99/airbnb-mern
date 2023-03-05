import useInputHook from "../hooks/use-input.hook";
import FormElement from "../components/Places/FormElement";
import UploadForm from "../components/Places/UploadForm";
import Perks from "../components/Places/Perks";
import { placesAPI } from "../api/places.api";
import { useNavigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { useEffect, useMemo } from "react";
import useLoading from "../hooks/use-loading";
import Loader from "../components/Loader";
import { routerLink } from "../routes";
import Button from "../components/Button";

const MyPlace = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loading, setLoading, errorMessage, setErrorMessage } =
    useLoading(true);

  const title = useInputHook("");
  const address = useInputHook("");
  const addedPhotos = useInputHook([]);
  const photoLink = useInputHook("");
  const description = useInputHook("");
  const perks = useInputHook([]);
  const extraInfo = useInputHook("");
  const checkIn = useInputHook("");
  const checkOut = useInputHook("");
  const maxGuests = useInputHook(1);
  const price = useInputHook(0);
  const errorAddLink = useInputHook("");

  let stateForm = !id || id === "new" ? "new" : "existing";

  let disabledBtn = useMemo(() => {
    return title.value &&
      address.value &&
      addedPhotos.value.length > 0 &&
      description.value &&
      perks.value.length > 0 &&
      checkIn.value &&
      checkOut.value &&
      maxGuests.value >= 1 &&
      price.value >= 1
      ? false
      : true;
  }, [
    title.value,
    address.value,
    addedPhotos.value,
    description.value,
    perks.value,
    checkIn.value,
    checkOut.value,
    maxGuests.value,
    price.value,
  ]);

  useEffect(() => {
    const getPlace = async () => {
      if (!id || id === "new") {
        setLoading(false);
        return;
      }

      try {
        const placeItem = await placesAPI.getById(id);
        title.setValue(placeItem.title);
        address.setValue(placeItem.address);
        addedPhotos.setValue(placeItem.photos);
        description.setValue(placeItem.description);
        perks.setValue(placeItem.perks);
        extraInfo.setValue(placeItem.extraInfo);
        checkIn.setValue(placeItem.checkIn);
        checkOut.setValue(placeItem.checkOut);
        maxGuests.setValue(placeItem.maxGuests);
        price.setValue(placeItem.price || 0);
      } catch (err) {
        navigate(routerLink.myplaces);
      } finally {
        setLoading(false);
      }
    };
    getPlace();
  }, [id]);

  const addPhotoByLink = async (e) => {
    e.preventDefault();
    try {
      const { filename } = await placesAPI.uploadByLink(photoLink.value);
      addedPhotos.setValue([...addedPhotos.value, filename]);
      photoLink.setValue("");
    } catch (err) {
      errorAddLink.setValue(err);
      setTimeout(() => errorAddLink.setValue(""), 2000);
    }
  };

  const uploadPhoto = async (e) => {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    const { filenames } = await placesAPI.uploadFiles(data);
    addedPhotos.setValue([...addedPhotos.value, ...filenames]);
  };

  const removePhoto = (filename) => {
    addedPhotos.setValue(
      [...addedPhotos.value].filter((filenameP) => filenameP !== filename)
    );
  };

  const selectAsMainPhoto = (link) => {
    const filtered = [...addedPhotos.value].filter(
      (filenameP) => filenameP !== link
    );
    addedPhotos.setValue([link, ...filtered]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title.value,
      address: address.value,
      photos: addedPhotos.value,
      description: description.value,
      perks: perks.value,
      extraInfo: extraInfo.value,
      checkIn: checkIn.value,
      checkOut: checkOut.value,
      maxGuests: maxGuests.value,
      price: price.value,
    };

    try {
      if (stateForm === "new") {
        await placesAPI.create(data);
      } else {
        await placesAPI.update(id, data);
      }

      navigate(routerLink.myplaces);
    } catch (err) {
      setErrorMessage(err);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <AccountNav subpage={"places"} />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={onSubmit}>
        <FormElement
          title={"Title"}
          subtitle={`title for your place.should be short and catchy as in
          advertisement`}
        >
          <input
            value={title.value}
            onChange={title.handleInput}
            type="text"
            placeholder="title for example: My lovely apt"
          />
        </FormElement>

        <FormElement title={`Address`} subtitle={`Address to this place`}>
          <input
            value={address.value}
            onChange={address.handleInput}
            type="text"
            placeholder="address"
          />
        </FormElement>

        <FormElement
          errorMessage={errorAddLink.value}
          title={`Photos`}
          subtitle={`more = better`}
        >
          <div className="flex gap-2">
            <input
              value={photoLink.value}
              onChange={photoLink.handleInput}
              type="text"
              placeholder="Add using a link ...jpg"
            />
            <button
              onClick={addPhotoByLink}
              disabled={photoLink.value === ""}
              className="bg-gray-200 px-4 rounded-2xl tedt"
            >
              Add&nbsp;photo
            </button>
          </div>
        </FormElement>

        <UploadForm
          removePhoto={removePhoto}
          addedPhotos={addedPhotos.value}
          uploadPhoto={uploadPhoto}
          selectAsMainPhoto={selectAsMainPhoto}
        />

        <FormElement
          title={`Description`}
          subtitle={`description of the place`}
        >
          <textarea
            value={description.value}
            onChange={description.handleInput}
          />
        </FormElement>

        <FormElement
          title={`Perks`}
          subtitle={` select all the perks of your place`}
        >
          <Perks selected={perks.value} onChange={perks.setValue} />
        </FormElement>

        <FormElement title={`Extra info`} subtitle={`house rules, etc`}>
          <textarea value={extraInfo.value} onChange={extraInfo.handleInput} />
        </FormElement>

        <FormElement
          title={`Check in out times, max guests`}
          subtitle={`add check in and out times, remember to have some time window for
          cleaning the room betweeen guests`}
        >
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                value={checkIn.value}
                onChange={checkIn.handleInput}
                placeholder="14:00"
                type="text"
              ></input>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                value={checkOut.value}
                onChange={checkOut.handleInput}
                type="text"
              ></input>
            </div>
            <div>
              <h3 className="mt-2 -mb-1">max number of guests</h3>
              <input
                value={maxGuests.value}
                onChange={maxGuests.handleInput}
                type="number"
              ></input>
            </div>

            <div>
              <h3 className="mt-2 -mb-1">Price</h3>
              <input
                value={price.value}
                onChange={price.handleInput}
                type="number"
              ></input>
            </div>
          </div>
        </FormElement>

        <div className="flex justify-center">
          <Button
            type="submit"
            className={"my-4"}
            style={{ width: "200px" }}
            disabled={disabledBtn}
          >
            {stateForm === "new" ? "Save" : "Update"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyPlace;
