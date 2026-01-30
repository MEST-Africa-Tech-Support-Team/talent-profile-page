import TalentCard from "./TalentCard";

export default function TalentCards({ talents, onViewProfile }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto px-4">
      {talents.map((talent) => (
        <TalentCard
          key={talent.id}
          name={talent.name}
          role={talent.role}
          image={talent.images && talent.images.length > 0 ? talent.images[0] : ''} // Correctly access the image
          onViewProfile={() => onViewProfile(talent)}
        />
      ))}
    </div>
  );
}