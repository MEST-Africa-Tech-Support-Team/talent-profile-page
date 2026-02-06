import React from "react";

export default function ProjectBanner() {
    return (

        <section className="bg-primary-100 text-white px-4 sm:px-6 md:px-10 py-6 sm:py-8 text-center min-h-[40vh] sm:min-h-[50vh] flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4 font-bold mt-4 sm:mt-6 leading-snug">
                Discover Amazing <br className="hidden sm:block" /> Projects
            </h1>
            <p className="mt-2 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-4">
                Explore innovative projects built by talented developers from{" "}
                <br className="hidden sm:block" /> across the MEST community
            </p>
        </section>

    );
}
